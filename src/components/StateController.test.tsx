import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StateController } from './StateController';

describe('StateController', () => {
  it('calls setActiveState when a button is clicked', () => {
    const setActiveState = vi.fn();
    render(<StateController activeState="Flow" setActiveState={setActiveState} />);
    userEvent.click(screen.getByText('Anxious'));
    expect(setActiveState).toHaveBeenCalledWith('Anxious');
  });
});
