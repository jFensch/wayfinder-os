[![Deploy Status](https://vercel.com/jFensch/wayfinder-os/badge.svg)](https://wayfinder-j9mq6eejf-jeremys-projects-f2e94c9c.vercel.app)

**Live Demo:** https://wayfinder-j9mq6eejf-jeremys-projects-f2e94c9c.vercel.app

# 🧠 Wayfinder OS

**A Live Neural Map of a Poetic Systems Engineer**

Wayfinder OS is an interactive web demo that visualizes the lived experience of a neurodivergent mind. It turns emotional states into immersive, shareable insight through animated brain regions, state toggles, and poetic tooltips.

---

## 🚀 Live Demo

[https://wayfinder-j9mq6eejf-jeremys-projects-f2e94c9c.vercel.app](https://wayfinder-j9mq6eejf-jeremys-projects-f2e94c9c.vercel.app)

---

## ✨ Features

- **State Toggles**: Switch between `Flow`, `Anxious`, `Sad`, and `Shutdown` modes  
- **Animated Regions**: Regions resize, recolor, and pulse to reflect each state  
- **Poetic Tooltips**: Hover any region to see its metaphorical description  
- **Custom Behaviors**: DMN expands in “Sad” mode, anxiety glows in red, etc.  
- **Bun-Powered**: Fast startup and development with Bun, React, TypeScript, and Tailwind  

---

## 🛠️ Getting Started

### Prerequisites

- **Bun** (v1.0+) installed globally  
- Git (for cloning and version control)  

### Installation

```bash
git clone https://github.com/jFensch/wayfinder-os.git
cd wayfinder-os
./setup.sh

### Running Tests

```bash
bun run test
```

---

## 🔧 Development & Quality Assurance

This project includes comprehensive safeguards to prevent shipping broken code:

### Package Scripts

#### Development Scripts
```bash
# Start development server
bun run dev

# Run tests in watch mode (tight inner dev loop)
bun run test:watch

# Run tests with UI
bun run test:ui

# Type checking
bun run type-check
```

#### Testing Scripts
```bash
# Run all tests once
bun run test:run

# Run tests with coverage report
bun run test:coverage

# CI-optimized test run with verbose output
bun run test:ci
```

#### Code Quality Scripts
```bash
# Lint code and report issues
bun run lint

# Auto-fix linting issues
bun run lint:fix

# Format code with Prettier
bun run format

# Check if code is properly formatted
bun run format:check
```

#### CI/CD Scripts
```bash
# Pre-commit validation (type-check + lint + format + test)
bun run pre-commit

# Full CI pipeline (type-check + lint + test + build)
bun run ci
```

### Code Quality Tools

#### ESLint Configuration
- **TypeScript** support with `@typescript-eslint/eslint-plugin`
- **React** rules with `eslint-plugin-react` and `eslint-plugin-react-hooks`
- **Accessibility** checks with `eslint-plugin-jsx-a11y`
- **Prettier** integration for consistent formatting
- Custom rules for code quality and best practices

#### Prettier Configuration
- Automatic code formatting on save (VS Code)
- Consistent style across the codebase
- Integration with ESLint to avoid conflicts

#### Testing Setup
- **Vitest** for fast unit testing
- **@testing-library/react** for component testing
- **jsdom** environment for DOM testing
- **Coverage reports** with 80% thresholds
- Support for async testing with `@testing-library/user-event`

### VS Code Integration

#### Auto-formatting
- Format on save enabled
- ESLint auto-fix on save
- Consistent tab size and spacing

#### Recommended Extensions
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Tailwind CSS (`bradlc.vscode-tailwindcss`)
- Vitest (`vitest.explorer`)
- Bun (`oven.bun-vscode`)

### GitHub Actions CI/CD

The project includes a comprehensive CI pipeline that:
- ✅ **Type checks** with TypeScript
- ✅ **Lints** code with ESLint
- ✅ **Validates** formatting with Prettier
- ✅ **Runs tests** with coverage reporting
- ✅ **Builds** the production bundle
- ✅ **Uploads** coverage to Codecov
- ✅ **Archives** build artifacts

#### Coverage Thresholds
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

### Development Workflow

1. **Before committing**: Run `bun run pre-commit`
2. **During development**: Use `bun run test:watch` for instant feedback
3. **Before pushing**: Ensure CI passes with `bun run ci`
4. **Code reviews**: GitHub Actions will validate all changes

---

## 🧪 Testing

### Running Tests

```bash
# Watch mode for development
bun run test:watch

# Single run with coverage
bun run test:coverage

# UI mode for interactive testing
bun run test:ui
```

### Test Structure
- Unit tests for components in `src/components/*.test.tsx`
- Test setup in `src/setupTests.ts`
- Configuration in `vitest.config.ts`

---
