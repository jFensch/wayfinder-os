import React from 'react';
import { BrainMap } from './components/BrainMap';
import { AppState } from './components/highlightRegions';
import { StateController } from './components/StateController';

export default function App() {
  const [activeState, setActiveState] = React.useState<AppState>('Flow');
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Wayfinder OS</h1>
      <p className="mb-6 italic">
        An interactive neural map of a poetic systems engineer
      </p>
      <StateController
        activeState={activeState}
        setActiveState={setActiveState}
      />
      <BrainMap activeState={activeState} />
    </div>
  );
}
