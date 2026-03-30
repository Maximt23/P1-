# Recommendation Logic & Diversity Criteria

This document outlines the specific criteria and rules that govern the WearWise recommendation engine. It serves as the acceptance criteria for the implementation of `RecommendationService.js`.

## 1. Core Recommendation Behavior
*   **Active Queue**: The system must always maintain exactly **3** active suggestions for the user.
*   **Ranking**:
    *   **Rank 1**: "Safest Option" - Prioritizes avoiding risky color combinations and relies on user-approved outfits or classic pairings.
    *   **Rank 2**: "Safe Varied Alternative" - Introduces variety in clothing items while still adhering to safe color and style combinations.
    *   **Rank 3**: "Safe Rotation Option" - Encourages rotation of less-frequently-worn but still viable items.

## 2. Repetition-Risk Criteria
These criteria prevent the suggestion engine from feeling stale or repetitive.
*   **Full Outfit Lockout**: The exact same combination of `torsoItemId`, `legItemId`, `hatItemId` (if any), and `outerwearItemId` (if any) must not be suggested for **5 full days** (120 hours) after it has been logged as worn.
*   **Standout Item Lockout**: A "standout item" (defined as any item with a `saturationLevel` of "bold" or a user-defined high-value item) must not be suggested for **2 full days** (48 hours) after it has been logged as worn.

## 3. Suggestion Variety Criteria
*   **Variety Score**: Every suggestion must have a `varietyScore` between 0-100. This score should increase based on the inclusion of items that have not been worn recently.
*   **Avoid Sterile Behavior**: Over a 7-day period, the suggestion engine should aim to propose outfits that cover at least 50% of a user's *eligible* wardrobe (items not in the laundry, archived, etc.).
*   **Prioritization**: Variety is subordinate to safety. Unsafe or low-confidence combinations must never be forced for the sake of variety.

## 4. Anti-Sterile Recommendation Checks
These are specific checks to ensure recommendations do not become overly similar day-to-day.
*   **Color Family Rotation**: If the Rank 1 suggestion on Day 1 features a blue torso item, the Rank 1 suggestion on Day 2 should prioritize a different color family if a safe alternative exists.
*   **Category Type Rotation**: Avoid suggesting the same `categoryType` (e.g., "button_shirt") for the same rank on consecutive days unless the user's wardrobe is extremely limited.

## 5. Tuck-Guidance Wording Variety Rules
Tuck guidance must be helpful, contextual, and non-judgmental.
*   **Rule**: The wording should be simple and provide a clear, optional suggestion.
*   **Approved Wording Examples**:
    *   `tuck_in`: "This shirt is best tucked in."
    *   `leave_untucked`: "This top looks best left untucked."
    *   `optional`: "Tucking this in is optional, depending on the look you want."
    *   `not_applicable`: (No text displayed)
*   **Anti-Pattern**: Avoid judgmental or forceful language like "You must tuck this in" or "Leaving this untucked is a mistake."

## 6. Acceptance Criteria for Future Recommendation Outputs
A recommendation output will be considered **valid** only if it meets all of the following criteria:
*   [ ] The queue contains exactly 3 suggestions, each with a unique rank (1, 2, 3).
*   [ ] Each suggestion passes the Repetition-Risk Criteria (Full Outfit and Standout Item Lockouts).
*   [ ] The `safetyScore` for each suggestion is above a predefined threshold (e.g., 75/100).
*   [ ] The `tuckGuidance` output matches one of the four allowed values and uses approved wording.
*   [ ] The output adheres to the Anti-Sterile Recommendation Checks.
