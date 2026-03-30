import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storageService } from '../services/StorageService';

export const AddClothingItemScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [categoryGroup, setCategoryGroup] = useState('torso'); // Default
  const [primaryColorFamily, setPrimaryColorFamily] = useState('');

  const handleSave = async () => {
    if (!name.trim() || !primaryColorFamily.trim()) {
      // Basic validation
      alert('Please enter a name and color.');
      return;
    }

    const newItem = {
      name,
      categoryGroup,
      primaryColorFamily,
      // Other fields will be added later
    };

    await storageService.addClothingItem(newItem);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Item Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Primary Color Family:</Text>
      <TextInput style={styles.input} value={primaryColorFamily} onChangeText={setPrimaryColorFamily} />
      {/* A picker would be better for categoryGroup, but text input is fine for foundation */}
      <Text>Category (torso, legs, hats, outerwear):</Text>
      <TextInput style={styles.input} value={categoryGroup} onChangeText={setCategoryGroup} />
      <Button title="Save Item" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
