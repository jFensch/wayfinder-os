import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

  it('shows tooltip on hover', async () => {
    fetchMock.mockResolvedValue({
      json: () =>
        Promise.resolve({
          regions: [
            {
              id: 'r1',
              name: 'Amygdala',
              role: 'emotion',
              color: '#f00',
              position: [0, 0, 0],
              tooltip: 'fear center',
            },
          ],
        }),
    });
    const { container } = render(<BrainMap activeState="Calm" />);
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    const mesh = await waitFor(() =>
      container.querySelector('mesh[name="region-hitbox"]')
    );
    expect(mesh).toBeTruthy();
    fireEvent.pointerOver(mesh!);

    expect(screen.getByText('Amygdala')).toBeInTheDocument();
    expect(screen.queryByText('fear center')).not.toBeInTheDocument();
  });

  it('displays info panel on click and hides on deselect', async () => {
    fetchMock.mockResolvedValue({
      json: () =>
        Promise.resolve({
          regions: [
            {
              id: 'r2',
              name: 'Hippocampus',
              role: 'memory',
              color: '#0f0',
              position: [0, 0, 0],
              tooltip: 'memory maker',
            },
          ],
        }),
    });

    const { container } = render(<BrainMap activeState="Flow" />);
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    const mesh = await waitFor(() =>
      container.querySelector('mesh[name="region-hitbox"]')
    );
    expect(mesh).toBeTruthy();
    fireEvent.click(mesh!);

    expect(screen.getAllByText('Hippocampus').length).toBeGreaterThan(0);
    expect(screen.getAllByText('memory maker').length).toBeGreaterThan(0);
    expect(screen.getByText('Deselect')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Deselect'));
    expect(screen.queryByText('Deselect')).not.toBeInTheDocument();
  });
});
