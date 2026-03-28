# Commit Rules

These rules define the standards for commit messages and practices within the Personal AI Startup Factory. Adhering to these rules ensures a clean, traceable, and professional git history, supported by the Git-Manager agent.

## General Principles
- **Atomic Commits:** Each commit must represent a single, logical change, as enforced by the Git-Manager.
- **Descriptive Messages:** Commit messages must clearly explain *what* was changed and *why*, adhering to professional standards.
- **Regular Commits:** Completed work must be committed and pushed to the GitHub repository without delay. Avoid long stretches of local-only untracked work.
- **Source of Truth:** The remote GitHub repo is the source of truth for persisted progress. After each meaningful completed step, sync the repo.

## Commit Message Format
Commit messages should follow the Conventional Commits specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Type
- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
- `chore`: Other changes that don't modify src or test files.
- `revert`: Reverts a previous commit.

### Scope (Optional)
The scope should be a noun describing the section of the codebase affected by the commit (e.g., `foreman`, `project-alpha`, `git-manager`, `auth`, `ui`).

### Short Description
- Use the imperative mood in the subject line (e.g., "add: improve user authentication" instead of "added: improved user authentication").
- Start with a lowercase letter.
- No period at the end.
- Keep it concise (max ~72 characters).

### Body (Optional)
- Use the imperative mood.
- Explain the *why* and *how* of the change. Include motivations for the change and contrast with previous behavior.
- Wrap lines at 72 characters.

### Footer (Optional)
- Reference issues or pull requests (e.g., `Closes #123`, `Fixes #456`).
- Include breaking changes information (e.g., `BREAKING CHANGE: 
<description>`).

## Example Commit Message

```
feat(project-alpha): implement user login functionality

Adds a new user login endpoint and integrates with the authentication service.
This change addresses the need for secure user access to Project Alpha features.

Refactors the user session management to use JWTs.

Closes #789
```

## Git-Manager Agent Role
The Git-Manager agent is responsible for ensuring adherence to these commit rules and the overall git discipline outlined in its definition. It will recommend branch naming, clean commit messages, update relevant logs, and enforce timely staging, committing, and pushing of meaningful changes to the GitHub repository.
