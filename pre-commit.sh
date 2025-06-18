#!/bin/bash

# Pre-commit hook script
# To install: cp pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

echo "🔍 Running pre-commit checks..."

# Type check
echo "📝 Type checking..."
bun run type-check
if [ $? -ne 0 ]; then
  echo "❌ Type check failed. Please fix TypeScript errors."
  exit 1
fi

# Lint
echo "🔍 Linting..."
bun run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Please fix linting errors or run 'bun run lint:fix'."
  exit 1
fi

# Format check
echo "💅 Checking formatting..."
bun run format:check
if [ $? -ne 0 ]; then
  echo "❌ Formatting check failed. Please run 'bun run format' to fix."
  exit 1
fi

# Tests
echo "🧪 Running tests..."
bun run test:run
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Please fix failing tests."
  exit 1
fi

echo "✅ All pre-commit checks passed!"
