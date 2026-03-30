import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { cameraService } from '../services/CameraService';

// This is a foundational screen. It sets up the UI structure and service hooks.
export const QuickColorCheckCameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [colorResult, setColorResult] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const status = await cameraService.requestCameraPermission();
      setHasPermission(status);
    })();
  }, []);

  const onCheckColor = async () => {
    if (cameraRef.current) {
      setColorResult({ label: 'Analyzing...', confidence: '...' });
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5, base64: true });
      const result = await cameraService.analyzeColor(photo.base64);
      setColorResult({
        label: result.likely_common_color_label,
        swatch: result.optional_visual_swatch,
        confidence: result.confidence_state,
      });
    }
  };

  const onSaveToWardrobe = () => {
    // Placeholder for navigation to Add Clothing Item flow
    console.log('Navigating to Wardrobe with color result:', colorResult);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <View style={styles.controls}>
        {colorResult && (
          <View style={styles.resultBox}>
            <View style={[styles.swatch, { backgroundColor: colorResult.swatch || '#ccc' }]} />
            <Text style={styles.resultText}>
              Likely Color: {colorResult.label} (Confidence: {colorResult.confidence})
            </Text>
          </View>
        )}
        <Button title="Check Color" onPress={onCheckColor} />
        {colorResult && <Button title="Save to Wardrobe" onPress={onSaveToWardrobe} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  controls: { padding: 20, backgroundColor: 'white' },
  resultBox: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  swatch: { width: 30, height: 30, borderRadius: 5, marginRight: 10, borderWidth: 1, borderColor: '#333' },
  resultText: { fontSize: 16 },
});
