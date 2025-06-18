# Brain Model & Data Synchronization

This document explains how the 3D brain model and the brain-map.json data are synchronized in the Wayfinder OS project.

## Overview

The brain visualization consists of two main components:
1. **3D Model** (`public/models/brain.glb`) - The visual 3D representation
2. **Region Data** (`public/brain-map.json`) - Interactive region information

## Synchronization Strategy

### Component Mapping

The 3D model components are synchronized with the brain-map.json regions through consistent naming and positioning:

| 3D Model Component | JSON ID | Description |
|-------------------|---------|-------------|
| `LeftHemisphere` | `leftHemisphere` | Left cerebral hemisphere |
| `RightHemisphere` | `rightHemisphere` | Right cerebral hemisphere |
| `LeftFrontalLobe` | `leftFrontalLobe` | Left frontal cortex |
| `RightFrontalLobe` | `rightFrontalLobe` | Right frontal cortex |
| `LeftOccipitalLobe` | `leftOccipitalLobe` | Left visual cortex |
| `RightOccipitalLobe` | `rightOccipitalLobe` | Right visual cortex |
| `LeftAmygdala` | `leftAmygdala` | Left emotion center |
| `RightAmygdala` | `rightAmygdala` | Right emotion center |
| `Cerebellum` | `cerebellum` | Balance and coordination |
| `LeftHippocampus` | `leftHippocampus` | Left memory center |
| `RightHippocampus` | `rightHippocampus` | Right memory center |
| `LeftThalamus` | `leftThalamus` | Left sensory relay |
| `RightThalamus` | `rightThalamus` | Right sensory relay |
| `CorpusCallosum` | `corpusCallosum` | Hemisphere bridge |
| `BrainStem` | `brainStem` | Vital functions control |
| `Midbrain` | `midbrain` | Reflex control |
| `Pons` | `pons` | Sleep/arousal control |
| `MedullaOblongata` | `medullaOblongata` | Breathing/heart control |
| `PituitaryGland` | `pituitaryGland` | Hormone regulation |

### Position Coordination

The positions in brain-map.json exactly match the 3D model coordinates:

```javascript
// Example: Cerebellum
// 3D Model: cerebellumMesh.position.set(0, -0.3, -0.7)
// JSON: "position": [0, -0.3, -0.7]
```

### Color Coordination

Colors in the JSON match the material colors in the 3D model:

```javascript
// Example: Frontal Lobes
// 3D Model: color: 0xccffcc (light green)
// JSON: "color": "#ccffcc"
```

## Generation Process

1. **Run the generator**: `npm run generate-brain`
2. **Updates both files**:
   - Creates `public/models/brain.glb`
   - Synchronizes with `public/brain-map.json`

## Maintaining Synchronization

When adding new brain components:

1. **Add to 3D model** in `scripts/generate-brain-model.js`:
   ```javascript
   const newComponent = new THREE.Mesh(geometry, material);
   newComponent.position.set(x, y, z);
   newComponent.name = 'ComponentName';
   brain.add(newComponent);
   ```

2. **Add to brain-map.json**:
   ```json
   {
     "id": "componentName",
     "name": "Component Name",
     "role": "Function description",
     "color": "#hexcolor",
     "position": [x, y, z],
     "tooltip": "Descriptive tooltip"
   }
   ```

3. **Regenerate**: `npm run generate-brain`

## Usage in Components

The BrainMap component uses both:
- **GLB model**: Loaded via `useGLTF('/models/brain.glb')`
- **JSON data**: Fetched from `/brain-map.json` for interactive regions

This ensures the visual 3D brain and the interactive overlay markers are perfectly aligned.
