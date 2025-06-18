# Brain Model Generation

This project uses a synchronized approach for generating both the 3D brain model and the associated region data.

## Overview

Both the `brain.glb` 3D model and `brain-map.json` data file are **generated automatically** and are synchronized to ensure consistency between the visual representation and the interactive data. The model mesh itself is copied from the open-source **threejs-brain-animation** package so that no network downloads are required.

## Generated Files

The following files are generated and should **not** be committed to version control:

- `public/models/brain.glb` - 3D brain model in GLB format
- `public/brain-map.json` - Brain region metadata with positions, colors, and descriptions

## Generation Process

### Automatic Generation

Run the generation script to create both files:

```bash
npm run generate-brain
```

This will:
1. ✅ Generate a detailed 3D brain model with anatomical components
2. ✅ Create synchronized JSON data with region information
3. ✅ Ensure positions, names, and colors match between 3D model and data

### Clean Generated Files

To remove generated files:

```bash
npm run clean-generated
```

## Brain Components

The generated model includes:

### Main Structures
- **Left/Right Hemispheres** - Main brain tissue
- **Cerebellum** - Balance and coordination
- **Brain Stem** - Vital functions (midbrain, pons, medulla)

### Deep Structures
- **Corpus Callosum** - Inter-hemispheric bridge
- **Thalamus** (L/R) - Sensory relay stations
- **Hippocampus** (L/R) - Memory formation centers
- **Amygdala** (L/R) - Emotion processing centers

### Functional Areas
- **Frontal Lobes** (L/R) - Executive function
- **Occipital Lobes** (L/R) - Visual processing
- **Pituitary Gland** - Hormone regulation

### Surface Detail
- **Cortical Folds** - Brain surface texture

## Synchronization Features

### Automatic Coordinate Mapping
- 3D model positions are automatically extracted and used in JSON data
- No manual coordinate entry required

### Consistent Naming
- Component names in the 3D model match the region IDs in JSON
- camelCase conversion applied automatically

### Color Coordination
- Colors defined in the generation script are applied to both 3D materials and JSON metadata
- Visual consistency between model and UI elements

### Rich Metadata
- Each brain region includes:
  - Scientific name and role description
  - Tooltip with engaging explanations
  - Accurate anatomical positioning
  - Color coding for functional groups

## Development Workflow

1. **Modify** brain components in `scripts/generate-brain-model.js`
2. **Run** `npm run generate-brain` to update both files
3. **Test** the application with synchronized data
4. **Commit** only the generation script, not the generated files

## CI/CD Integration

The build system automatically generates the required files:

- **Development**: `npm run dev` generates files before starting
- **Build**: `npm run build` generates files before building
- **CI**: `npm run ci` generates files before all checks

This ensures that:
- ✅ Generated files are always available when needed
- ✅ No manual file generation required in CI/CD
- ✅ Files stay out of version control
- ✅ Builds work in any environment

## Benefits

- ✅ **Always Synchronized** - 3D model and data never drift apart
- ✅ **Single Source of Truth** - All brain data defined in one place
- ✅ **Automatic Positioning** - No manual coordinate management
- ✅ **Type Safety** - Generated data matches expected structure
- ✅ **Easy Updates** - Modify script and regenerate everything
- ✅ **No Version Control Bloat** - Generated files stay out of git

## File Structure

```
scripts/
  generate-brain-model.js    # 🔧 Generation script (committed)
public/
  brain-map.json            # 📋 Generated data (gitignored)
  models/
    brain.glb              # 🧠 Generated 3D model (gitignored)
```
