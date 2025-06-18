# Requirements and User Stories

The initial release of Wayfinder OS aims to provide an interactive visualization of a "neurodivergent" brain map. The following user stories capture the core functionality:

## User Stories

1. **Toggle emotional states**
   - *As a visitor,* I want to switch between `Flow`, `Anxious`, `Sad`, and `Shutdown` so that I can see how each state affects the brain map.
2. **Dynamic region behavior**
   - *As a visitor,* I expect brain regions to resize, recolor and pulse to reflect the selected state.
3. **State-driven highlights**
   - *As a visitor,* I see different regions emphasized depending on the selected state (e.g., Amygdala in "Anxious", Frontal Lobes in "Flow").
4. **Informative tooltips**
   - *As a visitor,* I want to hover over a region and read a short description that poetically explains its role.
5. **Display region details**
   - *As a visitor,* I want to click on a brain region and see its name, role, and a detailed description in a dedicated panel.
6. **Clear selection**
   - *As a visitor,* I want to be able to deselect a region to hide the details panel.
7. **Fast start and development**
   - *As a developer,* I need a quick development workflow powered by Bun, Vite and React.

## Non-Functional Requirements

- All region data is stored in `public/brain-map.json` for easy modification.
- The application is written in TypeScript and styled using Tailwind CSS.
- Tests use Vitest and Testing Library.
