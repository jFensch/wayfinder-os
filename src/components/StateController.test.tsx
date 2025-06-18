import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StateController } from './StateController';

describe('StateController', () => {
  it('calls setActiveState when a button is clicked', async () => {
    const user = userEvent.setup();
    const setActiveState = vi.fn();
    render(
      <StateController activeState="Flow" setActiveState={setActiveState} />
    );
    await user.click(screen.getByText('Anxious'));
    expect(setActiveState).toHaveBeenCalledWith('Anxious');
  });
});
