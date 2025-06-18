# ADR 0001: Use React with Vite and Bun

## Status
Accepted

## Context
Wayfinder OS is an interactive front-end demo. We need a fast development environment with modern tooling and high performance.

## Decision
We will build the application using React and TypeScript. Vite will provide the dev server and build tooling, while Bun will manage dependencies and run scripts.

Tailwind CSS will handle styling for rapid UI iteration.

## Consequences
- Quick startup times and live reload during development.
- Requires installing Bun for contributors.
- The project is optimized for modern browsers.
