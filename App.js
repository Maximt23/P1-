import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Use background color from theme eventually
  },
});

export default App;
