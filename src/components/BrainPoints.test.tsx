import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { BrainPoints } from './BrainMap';

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useFrame: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  useGLTF: Object.assign(
    () => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
      return { nodes: { Brain: mesh }, scene: { children: [mesh] } };
    },
    { preload: vi.fn() }
  ),
}));

describe('BrainPoints', () => {
  it('generates positions for the given count', () => {
    const { container } = render(<BrainPoints activeState="Flow" count={10} />);
    const points = container.querySelector('points');
    expect(points).toBeTruthy();
  });
});
