# Repository Standards and Direction

This document outlines the overarching standards for code quality, documentation, project structure, and general practices within the Personal AI Startup Factory, reflecting our refined direction and planning priorities. The memory system is now an active operational decision engine, integral to these standards.

## Overarching Direction and Planning Priorities:
1.  **Git Discipline and Remote Sync:** Git discipline and remote synchronization are mandatory. The `git-manager` agent is responsible for handling every meaningful completed change, ensuring it is staged, committed, and pushed to the GitHub repository. The remote GitHub repository is the source of truth for persisted progress.
2.  **Project Isolation:** Project isolation is critical. Each project must remain entirely separate and must not overlap or contaminate others. Project-specific memory, configurations, and agents must be self-contained.
3.  **Foreman Agent Coordination:** The `foreman` agent must coordinate reusable agents across projects without contaminating project-specific memory or operational context. It facilitates the reuse of shared capabilities while respecting project boundaries.
4.  **Startup Factory Purpose:** This repository is intended to become a startup factory for white-label products, operational automations, and reusable coding systems that can be sold or deployed into companies.
5.  **Efficiency as a Top-Level Goal:** The system must minimize token waste, redundant prompts, repeated reasoning, stale code, duplicated files, and unnecessary deliberation. Every operation should strive for optimal resource utilization, actively leveraging the `token-efficiency.md` memory log.
6.  **Practical Memory Bank as Decision Engine:** The memory bank (`/memory` directory) is a practical operating advantage. It rigorously records what has worked (`wins.md`), what has failed (`failures.md`), what was tested (`experiments.md`), reusable patterns, anti-patterns, decision rationale (`decisions.md`), and cost/benefit observations. This structured memory is actively consulted by agents to improve future execution quality, reduce wasted tokens, and prevent repeated mistakes.
7.  **Modern, Enterprise-Clean, Startup-Lean:** The repository must stay modern in its practices and technologies, maintain an enterprise-level of cleanliness and organization, remain startup-lean in its resource usage and operational overhead, and avoid all forms of redundancy.

## General Principles
-   **Modularity & Reusability:** Design components and systems to be modular and easily reusable. Avoid duplicating functionality. Shared agents and components are designed for generic application, informed by `wins.md` and `anti-patterns` from `failures.md`.
-   **Clarity & Readability:** Prioritize clear, concise, and readable code and documentation. Favor simplicity over complexity.
-   **Efficiency:** Optimize for lean execution, minimal resource usage (tokens, compute), and quick iteration cycles, guided by `token-efficiency.md`.
-   **Security & Robustness:** Build with security in mind and design for robustness against errors and failures.
-   **Documentation:** Ensure all significant code, architectural decisions (recorded in `decisions.md`), and workflows are well-documented.

## Project Structure
-   All projects **must** reside under the `/projects/<project-name>` directory.
-   Each project **must** have its own `README.md`, `development.md`, `memory.md` (for project-specific lessons), and an `agents/project-agent.md`.
-   Standard subdirectories for projects include `src/` (source code), `docs/` (project-specific documentation), and `tests/` (test files).

## Code Standards
-   **Language:** Python 3.9+ is the primary language. Adhere to PEP 8.
-   **Formatting:** Use an auto-formatter (e.g., Black) for consistent code style.
-   **Linting:** Use a linter (e.g., Flake8) to catch potential errors and style violations.
-   **Testing:** Write unit and integration tests for all critical components. Aim for high test coverage.
-   **Dependencies:** Manage dependencies explicitly using `requirements.txt` or similar.

## Documentation Standards
-   **Markdown First:** All documentation should be written in Markdown.
-   **Clear Headings:** Use clear and hierarchical headings for easy navigation.
-   **Concise Language:** Be direct and avoid jargon where possible.
-   **Diagrams (when useful):** Use simple text-based diagrams (e.g., Mermaid) if they aid understanding.
-   **Readme Contents:** Each `README.md` should clearly state the purpose, setup, and usage of the component or project.

## Agent Standards
-   **Clear Purpose:** Each agent **must** have a clearly defined purpose and set of responsibilities.
-   **Operating Model:** Document the agent's operating model and how it interacts with other agents, including their active use of the memory system.
-   **Isolation:** Project agents **must** remain isolated to their respective projects. Shared agents **must** remain generic and reusable across projects without cross-contamination.
-   **Efficiency:** Agents should be designed to minimize token usage and unnecessary deliberation, actively consulting `token-efficiency.md` and other memory logs to achieve this.

## Naming Conventions
-   **Files & Directories:** `kebab-case` for files and directories (e.g., `my-new-file.md`, `shared-agents/`).
-   **Python Modules:** `snake_case` for Python module names.
-   **Variables & Functions:** `snake_case` for Python variables and function names.
-   **Classes:** `PascalCase` for Python class names.

## Security Best Practices
-   Avoid hardcoding sensitive information. Use environment variables or a secure configuration management system.
-   Sanitize all user inputs.
-   Follow least privilege principles.
