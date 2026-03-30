# WearWise Project File Ownership Map

This map defines the primary ownership of files and directories by different agents to prevent overlap and ensure clear responsibilities.

## Agent Responsibilities:

### Boss Agent (PMA)
*   `development.md` (primary owner for updates and overall roadmap)
*   `memory.md` (primary owner for updates)
*   `file_ownership_map.md` (primary owner)
*   Overall project coordination and task allocation.
*   Review of agent task packets.
*   Ensuring adherence to governance rules.

### Product Writer Agent (PWA)
*   `docs/product-overview.md`
*   `docs/mvp-scope.md`
*   `docs/user-flows.md`
*   `docs/screen-map.md`
*   `docs/accessibility-requirements.md`

### UI Agent (UIA)
*   `app/screens/` (all files within)
*   `app/components/` (all files within)
*   `app/components/ui/` (all files within)
*   `app/theme/` (all files within)
*   `App.js` (main application component)
*   `index.js` (entry point)
*   All styling definitions (e.g., in `app/theme/colors.js`, `app/theme/typography.js`)

### App Development Agent (ADA)
*   `app/models/` (all files within, e.g., data model definitions)
*   `app/services/` (all files within, e.g., API integrations, camera, weather, database services)
*   `app/storage/` (all files within, e.g., local storage management)
*   `app/hooks/` (all files within, e.g., custom React hooks)
*   Core logic and data fetching within screens and components.
*   Integration of services and models.

### Review Agent (RA)
*   Performs code reviews across all files.
*   Conducts architecture reviews.

### Test Agent (TA)
*   `tests/` (all files within)
*   `docs/testing-strategy.md`
*   Defines and executes all test cases.

### Patch / Refactor Agent (PRA)
*   Performs targeted code improvements and refactoring across all application code (e.g., `app/`).

### QA / Validation Agent (QVA)
*   `docs/app-store-readiness.md`
*   Conducts manual and automated quality assurance and validation.

### Recommendation Diversity Agent (RDA)
*   Owns the specific logic and algorithms for generating diverse outfit recommendations within `app/services/recommendationService.js` (or similar).

### Git / Change Control Agent (GCCA)
*   `.gitignore`
*   `package.json`
*   Manages version control and repository configuration.

## Shared-Screen Ownership Rules:
*   A UI Agent primarily owns the *presentation* layer of a screen (e.g., how elements look and are laid out, basic component assembly).
*   An App Development Agent primarily owns the *logic and data fetching* within a screen (e.g., what data is displayed, how user interactions affect state, business logic integration).
*   Any changes requiring modification to both presentation and logic on a screen must be serialized and coordinated by the Project Manager Agent.

## Serialization Rule for Conflicting Ownership:
*   If two agents require write access to the same file or a closely interdependent set of files, their tasks must be serialized. The Project Manager Agent will arbitrate and define the sequence. Read-only access for other agents is generally permitted and encouraged for transparency.
