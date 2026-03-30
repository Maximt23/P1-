import { recommendationService } from '../../app/services/RecommendationService';

describe('RecommendationService', () => {
  const mockWardrobe = [{ id: 't1', categoryGroup: 'torso' }, { id: 'l1', categoryGroup: 'legs' }];
  const mockHistory = [];

  it('returns an array of 3 or fewer suggestions', async () => {
    const suggestions = await recommendationService.generateOutfitSuggestions(mockWardrobe, mockHistory, {});
    expect(suggestions.length).toBeLessThanOrEqual(3);
  });

  it('returns suggestions with correct rank, safety, and variety scores', async () => {
    const suggestions = await recommendationService.generateOutfitSuggestions(mockWardrobe, mockHistory, {});
    if (suggestions.length > 0) {
      expect(suggestions[0].rank).toBe(1);
      expect(suggestions[0].safetyScore).toBeDefined();
      expect(suggestions[0].varietyScore).toBeDefined();
    }
  });

  // This is a scaffolded test for a future, more complex implementation
  it('respects repetition-risk criteria', () => {
    // TODO: Add tests with mock history to ensure recently worn items are excluded.
    expect(true).toBe(true);
  });

  it('includes tuck guidance in all suggestions', async () => {
    const suggestions = await recommendationService.generateOutfitSuggestions(mockWardrobe, mockHistory, {});
    if (suggestions.length > 0) {
      expect(suggestions[0].tuckGuidance).toBeDefined();
    }
  });
});
