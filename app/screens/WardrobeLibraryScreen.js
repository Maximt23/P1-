import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { storageService } from '../services/StorageService';

export const WardrobeLibraryScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const wardrobeItems = await storageService.getClothingItems();
    setItems(wardrobeItems);
  };

  // useFocusEffect will re-run the effect when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text>{item.categoryGroup} - {item.primaryColorFamily}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>Your wardrobe is empty. Add an item!</Text>}
      />
      <Button
        title="Add New Item"
        onPress={() => navigation.navigate('AddClothingItem')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  itemName: { fontWeight: 'bold' },
});
