# WearWise Project Memory

## 1. Decisions
*   ... (previous decisions)
*   **Git Workflow Stabilization (2024-03-01)**: Adopted a deliberate, single-unit commit strategy to mitigate transient `index.lock` errors. Each logical unit of work will be staged and committed atomically, with a `git status` check before and after.

## 2. Wins
*   ... (previous wins)
*   **Successful Git Stabilization (2024-03-01)**: Successfully diagnosed the transient `index.lock` issue as a race condition and developed a reliable workflow (reset, targeted add, commit) to produce clean, atomic commits.

## 3. Failures
*   ... (previous failures)
*   **Git Instability (2024-03-01)**: Initial attempts to commit multiple logical units or use broad staging commands (`git add .`) were unreliable due to the shell environment's handling of git processes, leading to several failed commits and necessary rollbacks.

## 4. Reusable Lessons
*   ... (previous lessons)
*   **Tool Instability Requires Process Change**: When a core tool (like git in a specific shell) is unstable, simplify the process to its most atomic, verifiable steps. Do not attempt complex sequences until the tool's behavior is reliable.
*   **Create Working Artifacts**: Creating `token_efficiency.md` and `commit-strategy.md` provides explicit, reusable guidance that reduces ambiguity and repeated mistakes.

## 5. Known Repo/Tooling Hazards
*   The `agent_run_shell_command` tool can produce transient `git index.lock` errors, especially with rapid, sequential git commands. Always verify `git status` after staging and before committing.
