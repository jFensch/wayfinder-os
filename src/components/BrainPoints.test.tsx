// Mock modules before imports
import { afterEach, describe, expect, it, vi } from 'vitest';
// Mock MeshSurfaceSampler to avoid heavy geometry computations
vi.mock('three-stdlib', () => ({
  MeshSurfaceSampler: class {
    constructor(_mesh: any) {}
    build(): this {
      return this;
    }
    sample(vec: any): void {
      vec.set(0, 0, 0);
    }
  },
}));
// Mock react-three/fiber so hooks and Canvas render simply
vi.mock('@react-three/fiber', () => {
  const Basic = ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  );
  return {
    Canvas: Basic,
    useFrame: vi.fn(),
    useThree: () => ({
      gl: {},
      scene: {},
      camera: {},
    }),
  };
});
// Mock drei useGLTF to return minimal mesh data
vi.mock('@react-three/drei', () => {
  const useGLTF = Object.assign(
    () => ({ nodes: { Brain: { geometry: {} } }, scene: { children: [] } }),
    { preload: vi.fn() }
  );
  return { useGLTF };
});
// Now import necessary modules
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { BrainPoints } from './BrainMap';

afterEach(() => {
  cleanup();
});

describe('BrainPoints', () => {
  it('generates positions for the given count', () => {
    const { container } = render(<BrainPoints activeState="Flow" count={10} />);
    const points = container.querySelector('points');
    expect(points).toBeTruthy();
  });
});
