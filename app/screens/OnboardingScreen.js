import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePermissions } from '../hooks/usePermissions';
import { storageService } from '../services/StorageService';

// Using basic components for foundation. Will be replaced by theme components from app/components/ui.
export const OnboardingScreen = () => {
  const navigation = useNavigation();
  const { locationStatus, requestLocationPermission } = usePermissions();

  const [isResearchConsentGranted, setIsResearchConsentGranted] = useState(false);
  const [isWeatherEnhancementEnabled, setIsWeatherEnhancementEnabled] = useState(false);
  const [showLocationHelperText, setShowLocationHelperText] = useState(false);

  const handleLocationToggle = async (value) => {
    setIsWeatherEnhancementEnabled(value);
    if (value) {
      setShowLocationHelperText(true);
      await requestLocationPermission();
    } else {
      setShowLocationHelperText(false);
    }
  };

  const onContinue = async () => {
    try {
      const userPreferences = {
        id: 1, // Using fixed ID for single-row upsert
        researchConsentGranted: isResearchConsentGranted,
        researchConsentStatus: isResearchConsentGranted ? 'granted' : 'declined',
        researchConsentTimestamp: new Date().toISOString(),
        researchConsentSource: 'onboarding',
        weatherEnhancementEnabled: isWeatherEnhancementEnabled,
        locationPermissionStatus: locationStatus || 'not_requested', // Use live status from hook
      };

      await storageService.saveUserPreferences(userPreferences);
      navigation.navigate('OutfitSuggestions'); // Navigate to the main app screen
    } catch (error) {
      console.error('Failed to save user preferences:', error);
      // In a real app, show a user-facing alert or toast message.
      // For now, we log the error and still attempt to navigate.
      navigation.navigate('OutfitSuggestions');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WearWise</Text>
      <View style={styles.option}>
        <Text style={styles.text}>Help improve the app by sharing anonymized data.</Text>
        <Switch
          accessibilityLabel="Research Consent Toggle"
          value={isResearchConsentGranted}
          onValueChange={setIsResearchConsentGranted}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.text}>Enable weather-aware outfit suggestions.</Text>
        <Switch
          accessibilityLabel="Weather Enhancement Toggle"
          value={isWeatherEnhancementEnabled}
          onValueChange={handleLocationToggle}
        />
      </View>
      {showLocationHelperText && <Text style={styles.helperText}>This feature requires location permission to work.</Text>}
      <Button title="Continue" onPress={onContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    flex: 1,
    marginRight: 16,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});
