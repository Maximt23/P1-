# WearWise Project Development Plan

## 1. Project Overview
*   **Name**: WearWise
*   **Product**: An accessibility-first outfit decision assistant for color-blind users.
*   **Primary Goal**: Help color-blind users avoid embarrassing outfit combinations and feel more independent and confident when deciding what to wear.
*   **Secondary Goal**: Help users identify likely clothing colors and clothing types.

## 2. Governance
*   **Top Governor**: Chief Maxim
*   **Single Source of Truth**: `development.md` for roadmap, scope, architecture direction, active work, sequencing, implementation priorities, phase status, and next steps.
*   **Decision/Lesson Tracking**: `memory.md` for decisions, wins, failures, reusable lessons, and token-efficiency lessons.
*   **Parallel Work**: All work that can safely run in parallel must run in parallel.
*   **Serialized Work**: Any work that risks ownership collision, merge conflict, or conflicting decisions must be serialized.
*   **File/Decision Ownership**: No two agents may own the same task domain, file responsibility, or decision boundary at the same time unless explicitly defined as read-only.

## 3. Technical Direction (Locked)
*   **Frontend**: React Native
*   **Platform**: iPhone-first
*   **Local Datastore (MVP)**: SQLite
*   **Photo/Media Storage**: Local file/media storage for clothing photos
*   **Post-MVP Research Infrastructure**: BigQuery
*   **Out of Scope (MVP)**: Auth/accounts, cloud sync implementation, Android MVP, web app MVP, speculative backend.

## 4. Product Direction (Locked)
*   **Product**: WearWise
*   **Accessibility**: Accessibility-first for color-blind users.
*   **Core Features** (MVP Scope):
    *   Wardrobe library
    *   Photo or manual item entry
    *   Editable clothing labels
    *   Outfit suggestions
    *   Manual outfit builder
    *   Outfit history
    *   Saved outfits
    *   Weekly routine setup
    *   Optional weather-aware ranking
    *   Optional research consent
    *   Settings and accessibility preferences
    *   Quick color check camera

## 5. Clothing Scope (Locked)
*   **Included**: Torso, Legs, Hats, Optional Outerwear
*   **Minimum Valid Outfit**: One torso item, one leg item
*   **Out of Scope**: Shoes, jewelry, bags, watches, accessory systems beyond hats

## 6. Recommendation Behavior (Locked)
*   **Active Suggestions**: Maintain 3 active suggestions.
*   **Ranking**:
    *   Rank 1: Safest option
    *   Rank 2: Safe varied alternative
    *   Rank 3: Safe rotation option
*   **Refresh**: Automatic refresh every 24 hours, manual refresh allowed.
*   **Repeat Avoidance**:
    *   Avoid same full outfit for 5 days.
    *   Avoid same standout item for 2 days.
*   **Rerank Triggers**:
    *   24-hour refresh reached
    *   Manual refresh requested
    *   Outfit logged as worn
    *   Outfit saved
    *   Outfit feedback recorded
    *   Wardrobe item added/edited/archived/deleted
    *   Routine settings changed
    *   Research consent changed
    *   Location permission changed
    *   Material weather change (when enabled)
    *   Low confidence item confirmed
    *   Suggestion expired or dismissed

## 7. Tuck Logic (Locked)
*   **Supported**: Yes
*   **Output Values**: `tuck_in`, `leave_untucked`, `optional`, `not_applicable`
*   **Guidance**: Contextual, optional, simple, never judgmental.

## 8. Quick Color Check Camera (Locked)
*   **Dedicated Feature**: Yes
*   **Behavior**: User opens live camera, app returns likely common color label, confidence state, and optional swatch. Separate from wardrobe capture.
*   **Permissions**: Does not require research consent or location/weather permission.

## 9. Consent and Permission Behavior (Locked)
*   **Research Consent**: Optional, app fully usable if declined. Declining only closes future research-data gate.
*   **Location/Weather Permission**: Optional, app fully usable if declined. Declining only skips weather-aware ranking.
*   **Decisions**: Separate for research consent and location/weather.

## 10. Initial Repository Scaffold
The following directory structure has been created:
```
wearwise-app/
├── .gitignore
├── package.json
├── App.js
├── index.js
├── app/
│   ├── screens/
│   ├── components/
│   │   ├── ui/
│   ├── models/
│   ├── services/
│   ├── storage/
│   ├── hooks/
│   ├── theme/
│   └── assets/
├── docs/
├── tests/
```

## 11. File Ownership Map Summary
*   **Boss Agent (PMA)**: Overall project coordination, `development.md`, `memory.md`, `file_ownership_map.md`.
*   **Product Writer Agent (PWA)**: `docs/product-overview.md`, `docs/mvp-scope.md`, `docs/user-flows.md`, `docs/screen-map.md`, `docs/accessibility-requirements.md`.
*   **UI Agent (UIA)**: `app/screens/`, `app/components/`, `app/components/ui/`, `app/theme/`, `App.js`, `index.js`, styling definitions.
*   **App Development Agent (ADA)**: `app/models/`, `app/services/`, `app/storage/`, `app/hooks/`, logic within screens and components, integration.
*   **Review Agent (RA)**: Code reviews, architecture reviews.
*   **Test Agent (TA)**: `tests/`, `docs/testing-strategy.md`, test definitions and execution.
*   **Patch / Refactor Agent (PRA)**: Targeted code improvements, refactoring.
*   **QA / Validation Agent (QVA)**: `docs/app-store-readiness.md`, manual and automated QA.
*   **Recommendation Diversity Agent (RDA)**: Specific logic for outfit recommendations.
*   **Git / Change Control Agent (GCCA)**: `.gitignore`, `package.json`, managing version control.

**Shared-Screen Ownership Rules:**
*   A UI Agent primarily owns the *presentation* layer of a screen (e.g., how elements look and are laid out).
*   An App Development Agent primarily owns the *logic and data fetching* within a screen (e.g., what data is displayed and how user interactions affect state).
*   Any changes requiring modification to both presentation and logic on a screen must be serialized and coordinated by the Project Manager Agent.

**Serialization Rule for Conflicting Ownership:**
*   If two agents require write access to the same file or a closely interdependent set of files, their tasks must be serialized. The Project Manager Agent will arbitrate and define the sequence. Read-only access for other agents is generally permitted.

## 12. Recommended Initial Screen List for MVP
*   OnboardingScreen
*   WeeklyRoutineSetupScreen
*   WardrobeLibraryScreen
*   QuickColorCheckCameraScreen
*   AddClothingItemScreen
*   ItemDetailEditScreen
*   OutfitSuggestionsScreen
*   ManualOutfitBuilderScreen
*   SavedOutfitsScreen
*   OutfitHistoryScreen
*   SettingsScreen

## 13. Current Phase Status & Next Steps
*   **Phase**: Launch Foundation & Initial Scaffolding
*   **Next Steps**:
    1.  Define initial agent task packets.
    2.  Execute parallelizable tasks for product documentation, basic UI structure, and core data models.
    3.  Begin serialized tasks as required.
