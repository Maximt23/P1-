import { storageService } from '../../app/services/StorageService';
import { db } from '../../app/storage/Database';

// Mock the database
jest.mock('../../app/storage/Database', () => ({
  db: {
    init: jest.fn().mockResolvedValue(true),
    db: {
      runAsync: jest.fn().mockResolvedValue(true),
      getFirstAsync: jest.fn().mockResolvedValue(null),
    },
  },
}));

describe('StorageService', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('saves user preferences with correct boolean to integer conversion', async () => {
    const prefs = {
      researchConsentGranted: true,
      weatherEnhancementEnabled: false,
      researchConsentStatus: 'granted',
      // ... other fields
    };
    await storageService.saveUserPreferences(prefs);

    expect(db.db.runAsync).toHaveBeenCalledWith(
      expect.any(String), // The SQL query
      expect.arrayContaining([1, 0]) // researchConsentGranted = 1, weatherEnhancementEnabled = 0
    );
  });

  it('gets user preferences and converts integers back to booleans', async () => {
    db.db.getFirstAsync.mockResolvedValueOnce({
      id: 1,
      researchConsentGranted: 1,
      weatherEnhancementEnabled: 0,
    });

    const prefs = await storageService.getUserPreferences();
    expect(prefs.researchConsentGranted).toBe(true);
    expect(prefs.weatherEnhancementEnabled).toBe(false);
  });
});
