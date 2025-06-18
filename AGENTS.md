# Repository Best Practices

This project uses Bun, Vitest, and React. Contributors should keep these guidelines in mind when working in this repo.

- **Always write unit tests** for any new feature or bug fix.
- **Run all pre-commit checks** with `bun run pre-commit` before committing. This runs type checking, linting, formatting, and tests.
- **Verify functionality** locally (e.g., start the dev server or run relevant scripts) before creating a pull request.
- **Keep documentation up to date**, especially files in `docs/` such as ADRs and diagrams, when your changes affect architecture or behavior.
- **Use conventional commits** (`feat:`, `fix:`, `docs:`, `chore:` etc.) for commit messages to keep history readable.
- **Ensure CI passes** on your branch before requesting a review.
- **Watch for warnings and code smells** in test output or the dev server and fix them early to keep the codebase healthy.

