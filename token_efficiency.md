# Token Efficiency & Context Management

This document provides a working strategy for managing context and token usage efficiently for the WearWise project. It must be read at the start of each major cycle.

## 1. Current Repo & Tooling Hazards
*   **Hazard**: `git add` and `git commit` commands executed via the shell tool are unstable and can cause transient `index.lock` errors, leading to corrupted commits.
*   **Mitigation**: Before any commit, the Git status must be checked. If unstable, a clean handoff for manual commit is required. Do not attempt complex Git sequences; prefer single, atomic commits for logical units.

## 2. Context Compression Rules
*   **Rule**: Do not reload the full `wearwise_final_prompt_pack_machine.json` after the initial setup phase.
*   **Rule**: The primary context sources for any given cycle must be `development.md` (for scope/tasks), `memory.md` (for lessons), and this file (`token_efficiency.md`).
*   **Rule**: Only read specific files related to the immediate task. Do not `list_files(recursive=True)` on the root directory without a clear reason.
*   **Rule**: Summarize outcomes in `development.md` and `memory.md` instead of keeping raw output in the prompt.

## 3. What to Read First Each Cycle (The "Context Packet")
1.  `development.md`: To understand the current project phase, next unlocked tasks, and overall scope.
2.  `memory.md`: To review recent wins, failures, and lessons learned to avoid repeating mistakes.
3.  `token_efficiency.md`: To reinforce the rules for context management and be aware of current hazards.

## 4. What NOT to Reread
*   The full JSON prompt pack. Its contents are now encoded in `development.md` and the foundational code.
*   The UI reference JSX file, unless the task is specifically about UI implementation.
*   Closed/completed files from previous, unrelated tasks.

## 5. Repeated Patterns to Reinforce
*   **Testing Honesty**: Do not describe a "provisional" or "scaffolded" test as a `PASS`. State its actual status (e.g., "scaffolded, not executed").
*   **Git Discipline**: Do not mix logically separate units of work in the same commit. If the environment is unstable, stop and prepare a handoff rather than creating a corrupt commit.

## 6. Recommended Unit Size for Commits
*   Given the current Git instability, commits should be slightly larger logical units than ideal, but still focused.
*   **Good**: A feature foundation and its related test scaffolds (e.g., camera screen + camera tests).
*   **Bad**: Onboarding fixes mixed with new camera features.
