import { describe, it, expect, vi } from 'vitest';
import * as THREE from 'three';
import { createPointsGeometry } from './createPointsGeometry';

vi.mock('three-stdlib', () => ({
  MeshSurfaceSampler: class {
    build() {
      return this;
    }
    sample(v: THREE.Vector3) {
      v.set(1, 2, 3);
    }
  },
}));

describe('createPointsGeometry', () => {
  it('produces geometry with the given point count', () => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
    const geom = createPointsGeometry(mesh, 5);
    expect(geom.getAttribute('position').count).toBe(5);
    expect(geom.getAttribute('color').count).toBe(5);
  });
});
