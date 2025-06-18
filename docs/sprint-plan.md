# Sprint Plan: Dynamic Brain Visualization

**Duration:** 1 Week

## Goal
Transform the application from a static model viewer into a dynamic, interactive neural map that responds to user-selected mental states.

## Key Tasks

### 1. Implement State-Driven Visualization
- **Description:** Modify the `BrainMap` component to visually represent the `activeState`. Different states will alter colors, intensity, and animations of specific brain regions.
- **Acceptance Criteria:**
  - The "Anxious" state highlights the Amygdala.
  - The "Flow" state highlights the Frontal Lobes and shows increased connectivity.
  - The "Sad" and "Shutdown" states have distinct visual representations (e.g., dimmed lighting, muted colors).
  - Visual changes are animated smoothly.

### 2. Display Region Information
- **Description:** Create a UI panel that displays detailed information about the currently selected brain region.
- **Acceptance Criteria:**
  - Clicking a brain region displays its `name`, `role`, and `tooltip` from `brain-map.json`.
  - The panel is well-styled and integrated into the existing layout.
  - A "Deselect" button or clicking the background clears the selection.

### 3. Refactor `BrainMap.tsx`
- **Description:** Improve code organization by extracting the `BrainPoints` component from `BrainMap.tsx` into its own file.
- **Acceptance Criteria:**
  - `BrainPoints` is located in `src/components/BrainPoints.tsx`.
  - The application's functionality remains unchanged after the refactor.

### 4. Update Documentation
- **Description:** Update project documentation to reflect the new features and development roadmap.
- **Acceptance Criteria:**
  - `README.md` is updated with new features.
  - `docs/requirements.md` includes the new functional requirements.

### 5. Optimize Bundle Splitting and Performance
- **Description:** Address large chunk warnings by code-splitting and configuring build optimizations.
- **Acceptance Criteria:**
  - Dynamic `import()` used to lazy-load heavy components or modules.
  - Vite/Rollup configured with `build.rollupOptions.output.manualChunks` to control chunk boundaries.
  - `build.chunkSizeWarningLimit` adjusted to suit project needs and suppress non-critical warnings.
  - Bundle size reduced below 500 kB per chunk where feasible.
