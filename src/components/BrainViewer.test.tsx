import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import BrainViewer from './BrainViewer';

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas">{children}</div>
  ),
  useFrame: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  useGLTF: Object.assign(() => ({ scene: { traverse: vi.fn() } }), {
    preload: vi.fn(),
  }),
}));

describe('BrainViewer', () => {
  it('renders a canvas', () => {
    const { getByTestId } = render(
      <BrainViewer highlightedRegions={['test']} />
    );
    expect(getByTestId('canvas')).toBeInTheDocument();
  });
});
