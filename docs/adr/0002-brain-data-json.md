# ADR 0002: Store Brain Map Data in JSON

## Status
Accepted

## Context
The brain map component needs structured data describing regions, colors and tooltips. We want contributors to be able to adjust this data without recompiling TypeScript.

## Decision
Region definitions will live in `public/brain-map.json`. The React app fetches this file at runtime and renders the regions.

## Consequences
- Data updates do not require a rebuild.
- JSON can be edited by non-developers.
- Fetching at runtime introduces a slight delay but keeps the app flexible.
