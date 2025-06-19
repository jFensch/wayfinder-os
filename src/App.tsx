import React, { Suspense } from 'react';
const BrainMap = React.lazy(() => import('./components/BrainMap'));
const BrainViewer = React.lazy(() => import('@/components/BrainViewer'));
import { StateController } from './components/StateController';

const highlightMap: Record<string, string[]> = {
  Anxious: ['leftAmygdala', 'rightAmygdala'],
  Flow: ['leftFrontalLobe', 'rightFrontalLobe'],
};

export default function App() {
  const [activeState, setActiveState] = React.useState('Flow');
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
      <Suspense fallback={<div>Loading...</div>}>
        <BrainMap activeState={activeState} />
        <BrainViewer highlightedRegions={highlightMap[activeState] ?? []} />
      </Suspense>
    </div>
  );
}
