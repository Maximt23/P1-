import React from 'react';
import { render } from '@testing-library/react-native';
import { WardrobeLibraryScreen } from './WardrobeLibraryScreen';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
  useFocusEffect: (callback) => callback(),
}));

jest.mock('../services/StorageService', () => ({
  storageService: {
    getClothingItems: jest.fn().mockResolvedValue([
      { id: '1', name: 'Blue Shirt', categoryGroup: 'torso' },
    ]),
  },
}));

describe('WardrobeLibraryScreen', () => {
  it('renders a list of items', () => {
    const { getByText } = render(<WardrobeLibraryScreen />);
    expect(getByText('Blue Shirt')).toBeTruthy();
  });

  it('renders an empty state message', () => {
    require('../services/StorageService').storageService.getClothingItems.mockResolvedValueOnce([]);
    const { getByText } = render(<WardrobeLibraryScreen />);
    expect(getByText('Your wardrobe is empty. Add an item!')).toBeTruthy();
  });
});
