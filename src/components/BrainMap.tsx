/* eslint-disable react/no-unknown-property */
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';

type Region = {
  id: string;
  name: string;
  role: string;
  color: string;
  position: [number, number, number];
  tooltip?: string;
};

type BrainMapProps = {
  activeState: string;
};

function BrainModel() {
  const { scene } = useGLTF('/models/brain.glb');
  return <primitive object={scene} scale={0.5} />;
}

export function BrainMap({ activeState: _activeState }: BrainMapProps) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch('/brain-map.json')
      .then((res) => res.json())
      .then((data) => setRegions(data.regions));
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded shadow-xl h-96">
      <h2 className="text-xl font-semibold mb-2">Neural Visualization</h2>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.6} />
        <hemisphereLight intensity={0.4} groundColor="black" />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <Suspense fallback={null}>
          <BrainModel />
          {regions.map((region) => (
            <mesh
              key={region.id}
              position={region.position}
              onPointerOver={() => setHovered(region.id)}
              onPointerOut={() => setHovered(null)}
              onClick={() => setSelected(region.id)}
            >
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial color={region.color} />
              {(hovered === region.id || selected === region.id) && (
                <Html distanceFactor={10} className="pointer-events-none">
                  <div className="bg-black bg-opacity-75 text-white text-xs p-2 rounded max-w-xs">
                    <strong>{region.name}</strong>
                    <br />
                    {region.role}
                    {region.tooltip && <p className="mt-1">{region.tooltip}</p>}
                  </div>
                </Html>
              )}
            </mesh>
          ))}
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/brain.glb');
