import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screen placeholders
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { WardrobeLibraryScreen } from '../screens/WardrobeLibraryScreen';
import { OutfitSuggestionsScreen } from '../screens/OutfitSuggestionsScreen';
import { QuickColorCheckCameraScreen } from '../screens/QuickColorCheckCameraScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WardrobeLibrary" component={WardrobeLibraryScreen} />
        <Stack.Screen name="OutfitSuggestions" component={OutfitSuggestionsScreen} />
        <Stack.Screen name="QuickColorCheckCamera" component={QuickColorCheckCameraScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        {/* Add other screens as they are developed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
