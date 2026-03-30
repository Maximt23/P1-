# Commit Strategy

This document outlines the version control strategy for the WearWise project, managed by the Git / Change Control Agent (GCCA). The goal is to maintain a clean, readable, and logical project history.

## 1. Core Principles
*   **Atomic Commits**: Each commit should represent a single logical change. A commit should not mix unrelated changes (e.g., a bug fix and a new feature).
*   **Clear Commit Messages**: Messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
*   **Feature Branches**: All new work (features, bug fixes, chores) must be done on a separate feature branch, not directly on `main`.
*   **Main is Always Deployable**: The `main` branch must always be in a stable, tested, and potentially deployable state.

## 2. Commit Grouping Strategy
This defines what gets committed together.
*   **Logical Units**: Group commits by their logical function.
    *   **Example**: All foundational model definitions (`ClothingItem.js`, `OutfitHistoryEntry.js`, etc.) can be committed together as `feat(models): define initial data models`.
    *   **Example**: The setup of a new service interface (`CameraService.js`) and its dependencies (`expo-camera` in `package.json`) should be committed together.
*   **Configuration with Code**: Changes to configuration files (e.g., `package.json`, `.eslintrc`) should be committed with the code that requires them.
*   **What Must Wait**: Do not commit incomplete work or code that breaks the build or tests. Use stashing (`git stash`) for work in progress.

## 3. The Gating Process: Commits, Reviews, and Merges
This defines the relationship between commits and the project's quality gates.
1.  **Development**: All development occurs on a feature branch (e.g., `feat/ada-004-onboarding-logic`).
2.  **Commit**: Developers make small, atomic commits on their feature branch.
3.  **Pull Request (PR)**: Once the feature is complete and passes local tests, a Pull Request is opened to merge the feature branch into `main`.
4.  **Review & Test Gates**:
    *   The PR triggers automated checks (CI/CD), including running all unit and integration tests (**Test Agent Gate**).
    *   The PR is assigned to the **Review Agent (RA)** for code and architectural review.
5.  **QA Gate**: After a PR is approved and merged, it is deployed to a staging environment where the **QA / Validation Agent (QVA)** performs manual validation.
6.  **Merge**: Only after all tests pass and all reviews are approved can a PR be merged into `main`.

## 4. Commit Grouping Plan for the Current Foundation Phase
*   **Commit 1: Project Docs & Strategy**
    *   Files: `docs/testing-strategy.md`, `docs/app-store-readiness.md`, `docs/recommendation-logic-criteria.md`, `docs/commit-strategy.md`
    *   Message: `docs: define initial testing, readiness, recommendation, and commit strategies`
*   **Commit 2: Navigation Foundation**
    *   Files: `app/navigation/AppNavigator.js`, `App.js` (changes), `package.json` (React Navigation deps)
    *   Message: `feat(navigation): implement basic stack navigator foundation`
*   **Commit 3: Permissions & Utilities Foundation**
    *   Files: `app/hooks/usePermissions.js`, `app/utils/helpers.js`, `package.json` (Expo Camera/Location deps)
    *   Message: `feat(core): implement permission hooks and utility functions`
*   **Commit 4: Foundational Unit Tests (Post-Gate)**
    *   Files: `tests/navigation/*.test.js`, `tests/hooks/*.test.js`, `tests/storage/*.test.js`, `tests/services/*.test.js`, `tests/models/*.test.js`
    *   Message: `test(core): add unit and integration tests for foundational code`
*   **Commit 5: Onboarding Logic (Post-Gate)**
    *   Files: `app/screens/OnboardingScreen.js` (logic), related service changes.
    *   Message: `feat(onboarding): implement consent and permission logic`
