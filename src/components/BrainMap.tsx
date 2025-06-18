/* eslint-disable react/no-unknown-property */
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState, useMemo } from 'react';

const highlightMap: Record<string, string[]> = {
  Anxious: ['leftAmygdala', 'rightAmygdala'],
  Flow: ['leftFrontalLobe', 'rightFrontalLobe'],
};

const baseOpacityMap: Record<string, number> = {
  Flow: 0.25,
  Anxious: 0.25,
  Sad: 0.15,
  Shutdown: 0.1,
};

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

export function BrainMap({ activeState }: BrainMapProps) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const selectedRegion = useMemo(
    () => regions.find((r) => r.id === selected) || null,
    [regions, selected]
  );

  useEffect(() => {
    fetch('/brain-map.json')
      .then((res) => res.json())
      .then((data) => setRegions(data.regions));
  }, []);

  return (
    <div
      className="bg-gray-800 p-6 rounded shadow-xl min-h-[32rem] lg:h-[70vh] relative flex flex-col"
      role="button"
      tabIndex={0}
      onClick={() => setSelected(null)}
      onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}
    >
      <h2 className="text-2xl font-semibold mb-2">Neural Visualization</h2>
      <div
        role="presentation"
        className="flex-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Canvas className="w-full h-full" camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.6} />
          <hemisphereLight intensity={0.4} groundColor="black" />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <Suspense fallback={null}>
            <primitive
              object={useGLTF('/models/brain.glb').scene}
              scale={1.2}
            />
            {regions.map((region) => {
              const highlighted = highlightMap[activeState]?.includes(
                region.id
              );
              const baseOpacity = baseOpacityMap[activeState] ?? 0.25;
              return (
                <group key={region.id} position={region.position}>
                  <mesh
                    name="region-hitbox"
                    visible={false}
                    onPointerOver={() => setHovered(region.id)}
                    onPointerOut={() => setHovered(null)}
                    onClick={() => setSelected(region.id)}
                  >
                    <sphereGeometry args={[0.15, 32, 32]} />
                    <meshBasicMaterial transparent opacity={0} />
                  </mesh>
                  <mesh>
                    <sphereGeometry args={[0.18, 32, 32]} />
                    <meshStandardMaterial
                      color={region.color}
                      transparent
                      opacity={
                        hovered === region.id || selected === region.id
                          ? 0.6
                          : highlighted
                            ? 0.5
                            : baseOpacity
                      }
                      emissive={region.color}
                      emissiveIntensity={
                        hovered === region.id || selected === region.id
                          ? 0.4
                          : highlighted
                            ? 0.6
                            : 0.1
                      }
                    />
                  </mesh>
                  {(hovered === region.id || selected === region.id) && (
                    <Html
                      sprite
                      distanceFactor={6}
                      className="pointer-events-none"
                    >
                      <div className="bg-black bg-opacity-75 text-white text-xs p-2 rounded max-w-sm break-words">
                        <strong>{region.name}</strong>
                        <br />
                        {region.role}
                        {region.tooltip && (
                          <p className="mt-1">{region.tooltip}</p>
                        )}
                      </div>
                    </Html>
                  )}
                </group>
              );
            })}
          </Suspense>
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
      </div>
      {selectedRegion && (
        <div
          className="absolute top-4 right-4 bg-gray-900 bg-opacity-80 p-4 rounded w-64 text-base"
          role="button"
          tabIndex={0}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}
        >
          <h3 className="text-lg font-semibold">{selectedRegion.name}</h3>
          <p className="mt-1">{selectedRegion.role}</p>
          {selectedRegion.tooltip && (
            <p className="mt-2 text-sm">{selectedRegion.tooltip}</p>
          )}
          <button
            className="mt-3 text-sm underline text-teal-400"
            onClick={() => setSelected(null)}
          >
            Deselect
          </button>
        </div>
      )}
    </div>
  );
}

useGLTF.preload('/models/brain.glb');
export default BrainMap;
