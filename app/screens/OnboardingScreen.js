import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePermissions } from '../hooks/usePermissions';
import { storageService } from '../services/StorageService';
import { generateUniqueId } from '../utils/helpers';

// Using basic components for foundation. Will be replaced by theme components from app/components/ui.
export const OnboardingScreen = () => {
  const navigation = useNavigation();
  const { requestLocationPermission } = usePermissions();

  const [isResearchConsentGranted, setIsResearchConsentGranted] = useState(false);
  const [isWeatherEnhancementEnabled, setIsWeatherEnhancementEnabled] = useState(false);

  const handleLocationToggle = async (value) => {
    setIsWeatherEnhancementEnabled(value);
    if (value) {
      await requestLocationPermission();
    }
  };

  const onContinue = async () => {
    try {
      const currentPrefs = await storageService.getUserPreferences();
      const locationPerms = await storageService.getLocationPermissionStatus(); // In a real scenario, this would come from the hook/OS

      const userPreferences = {
        ...currentPrefs, // In case there are other prefs, start with them
        id: 1, // Using fixed ID for single-row upsert
        researchConsentGranted: isResearchConsentGranted,
        researchConsentStatus: isResearchConsentGranted ? 'granted' : 'declined',
        researchConsentTimestamp: new Date().toISOString(),
        researchConsentSource: 'onboarding',
        weatherEnhancementEnabled: isWeatherEnhancementEnabled,
        locationPermissionStatus: locationPerms,
      };

      await storageService.saveUserPreferences(userPreferences);
      console.log('User preferences saved.');

      navigation.navigate('OutfitSuggestions'); // Navigate to the main app screen
    } catch (error) {
      console.error('Failed to save user preferences:', error);
      // Handle error, maybe show a message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WearWise</Text>
      <View style={styles.option}>
        <Text style={styles.text}>Help improve the app by sharing anonymized data.</Text>
        <Switch
          value={isResearchConsentGranted}
          onValueChange={setIsResearchConsentGranted}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.text}>Enable weather-aware outfit suggestions.</Text>
        <Switch
          value={isWeatherEnhancementEnabled}
          onValueChange={handleLocationToggle}
        />
      </View>
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
});
