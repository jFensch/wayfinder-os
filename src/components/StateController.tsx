import React from 'react';
import type { BrainState } from './highlightRegions';
  activeState: BrainState;
  setActiveState: (state: BrainState) => void;
const states: BrainState[] = ['Flow', 'Anxious', 'Sad', 'Shutdown'];
  activeState: AppState;
  setActiveState: React.Dispatch<React.SetStateAction<AppState>>;
};

const states: AppState[] = ['Flow', 'Anxious', 'Sad', 'Shutdown'];

export function StateController({
  activeState,
  setActiveState,
}: StateControllerProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Select State</h2>
      <div className="flex gap-4">
        {states.map((state) => (
          <button
            key={state}
            onClick={() => setActiveState(state)}
            className={`px-4 py-2 rounded border transition-colors duration-300 ease-in-out ${
              activeState === state ? 'bg-teal-500' : 'bg-gray-700'
            }`}
          >
            {state}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm">Current State: {activeState}</p>
    </div>
  );
}
