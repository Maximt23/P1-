import { db } from '../storage/Database';

class StorageService {
  // ... (other methods remain as stubs for now)

  async saveUserPreferences(preferences) {
    await db.init(); // Ensure DB is ready
    const {
      id = 1,
      researchConsentGranted,
      researchConsentStatus,
      researchConsentTimestamp,
      researchConsentSource,
      locationPermissionStatus,
      weatherEnhancementEnabled,
      weatherSource,
      lastWeatherRefreshAt,
      lastKnownCity,
      lastKnownRegion,
      lastKnownTemperatureF
    } = preferences;

    const query = `
      INSERT INTO UserPreferences (
        id, researchConsentGranted, researchConsentStatus, researchConsentTimestamp, researchConsentSource,
        locationPermissionStatus, weatherEnhancementEnabled, weatherSource, lastWeatherRefreshAt,
        lastKnownCity, lastKnownRegion, lastKnownTemperatureF
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        researchConsentGranted = excluded.researchConsentGranted,
        researchConsentStatus = excluded.researchConsentStatus,
        researchConsentTimestamp = excluded.researchConsentTimestamp,
        researchConsentSource = excluded.researchConsentSource,
        locationPermissionStatus = excluded.locationPermissionStatus,
        weatherEnhancementEnabled = excluded.weatherEnhancementEnabled,
        weatherSource = excluded.weatherSource,
        lastWeatherRefreshAt = excluded.lastWeatherRefreshAt,
        lastKnownCity = excluded.lastKnownCity,
        lastKnownRegion = excluded.lastKnownRegion,
        lastKnownTemperatureF = excluded.lastKnownTemperatureF;
    `;

    // Convert booleans to integers for SQLite
    const params = [
      id,
      researchConsentGranted ? 1 : 0,
      researchConsentStatus,
      researchConsentTimestamp,
      researchConsentSource,
      locationPermissionStatus,
      weatherEnhancementEnabled ? 1 : 0,
      weatherSource,
      lastWeatherRefreshAt,
      lastKnownCity,
      lastKnownRegion,
      lastKnownTemperatureF
    ];

    await db.db.runAsync(query, params);
    console.log('UserPreferences saved successfully.');
    return preferences;
  }

  async getUserPreferences() {
    await db.init(); // Ensure DB is ready
    const row = await db.db.getFirstAsync('SELECT * FROM UserPreferences WHERE id = 1');
    if (row) {
      // Convert integers back to booleans
      return {
        ...row,
        researchConsentGranted: !!row.researchConsentGranted,
        weatherEnhancementEnabled: !!row.weatherEnhancementEnabled
      };
    }
    return {}; // Return empty object if no preferences are set
  }

  // A helper/mock to get permission status, as this would normally come from the OS via the hook
  async getLocationPermissionStatus() {
      const row = await db.db.getFirstAsync('SELECT locationPermissionStatus FROM UserPreferences WHERE id = 1');
      return row ? row.locationPermissionStatus : 'not_requested';
  }

  // --- Other method stubs ---
  async saveClothingItem(item) { /* Placeholder */ console.log("Saving item:", item); return { id: 'new_item_id', ...item }; }
  async getClothingItems() { /* Placeholder */ console.log("Getting all items."); return []; }
  async updateClothingItem(item) { /* Placeholder */ console.log("Updating item:", item); return item; }
  async deleteClothingItem(id) { /* Placeholder */ console.log("Deleting item:", id); return true; }
  async saveOutfitHistoryEntry(entry) { /* Placeholder */ console.log("Saving outfit history:", entry); return { id: 'new_history_id', ...entry }; }
  async getOutfitHistory() { /* Placeholder */ console.log("Getting outfit history."); return []; }
  async saveSuggestionQueueEntry(entry) { /* Placeholder */ console.log("Saving suggestion:", entry); return { id: 'new_suggestion_id', ...entry }; }
  async getSuggestionQueue() { /* Placeholder */ console.log("Getting suggestion queue."); return []; }
  async saveQuickColorCheckResult(result) { /* Placeholder */ console.log("Saving quick color check result:", result); return { id: 'new_result_id', ...result }; }
  async getQuickColorCheckResults() { /* Placeholder */ console.log("Getting quick color check results."); return []; }
}

export const storageService = new StorageService();
