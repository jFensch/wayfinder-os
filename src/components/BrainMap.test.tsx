import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { BrainMap } from './BrainMap';

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useFrame: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  Html: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useGLTF: Object.assign(() => ({ scene: {} }), { preload: vi.fn() }),
}));

describe('BrainMap', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches brain regions on mount', async () => {
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve({ regions: [] }),
    });
    render(<BrainMap activeState="Flow" />);
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('/brain-map.json');
    });
    expect(screen.getByText('Neural Visualization')).toBeInTheDocument();
  });
});
