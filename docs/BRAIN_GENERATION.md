# Brain Model Auto-Generation

## Quick Start

The brain 3D model and region data are automatically generated. Just run:

```bash
npm run dev        # Generates files and starts development
npm run build      # Generates files and builds for production
npm run ci         # Generates files and runs all CI checks
```

## Manual Generation

To manually generate brain files:

```bash
npm run generate-brain    # Creates brain.glb and brain-map.json
npm run clean-generated   # Removes generated files
```

## Generated Files

These files are auto-generated and gitignored:
- `public/models/brain.glb` - 3D brain model
- `public/brain-map.json` - Interactive region data

## How It Works

1. **Script**: `scripts/generate-brain-model.js` defines all brain components
2. **3D Model**: Generates GLB file with anatomical structures  
3. **JSON Data**: Extracts positions/metadata for UI overlays
4. **Synchronization**: Ensures 3D model and data always match

See `docs/brain-generation.md` for detailed documentation.
