/* eslint-disable react/no-unknown-property */
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { Suspense, useEffect, useState, useMemo, useRef } from 'react';
import * as THREE from 'three';

const highlightMap: Record<string, string[]> = {
  Anxious: ['leftAmygdala', 'rightAmygdala'],
  Flow: ['leftFrontalLobe', 'rightFrontalLobe'],
};

function BrainModel({
  highlightRegions = [],
  hovered,
  selected,
  onHover,
  onSelect,
}: {
  highlightRegions?: string[];
  hovered: string | null;
  selected: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const gltf = useGLTF('/models/brain.glb');
  const group = useRef<THREE.Group>(null);

  const meshes = useMemo(() => {
    const arr: THREE.Mesh[] = [];
    gltf.scene.traverse((child: THREE.Object3D) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) arr.push(mesh);
    });
    return arr;
  }, [gltf]);

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.002;
  });

  useEffect(() => {
    meshes.forEach((mesh) => {
      const material = mesh.material;
      if (!(material instanceof THREE.MeshStandardMaterial)) return;
      const isSelected = selected === mesh.name;
      const isHovered = hovered === mesh.name;
      const isState = highlightRegions.includes(mesh.name);

      material.emissive.setHex(0xffd54f);
      material.emissiveIntensity = isSelected
        ? 0.8
        : isHovered
          ? 0.5
          : isState
            ? 0.4
            : 0;
      material.transparent = true;
      const baseOpacity = highlightRegions.length
        ? highlightRegions.includes(mesh.name)
          ? 1
          : 0.5
        : 1;
      material.opacity = isSelected || isHovered ? 0.6 : baseOpacity;
    });
  }, [meshes, highlightRegions, hovered, selected]);

  return (
    <group ref={group} scale={1.2}>
      {meshes.map((mesh) => (
        <primitive
          key={mesh.uuid}
          object={mesh}
          data-testid={`mesh-${mesh.name}`}
          onPointerOver={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            if (mesh.name !== selected) onHover(mesh.name);
          }}
          onPointerOut={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            if (hovered === mesh.name) onHover(null);
          }}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            onSelect(mesh.name);
          }}
        />
      ))}
    </group>
  );
}

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
            <BrainModel
              highlightRegions={highlightMap[activeState] ?? []}
              hovered={hovered}
              selected={selected}
              onHover={setHovered}
              onSelect={(id) => setSelected(id)}
            />
            {hovered && !selected && (
              <Html sprite distanceFactor={6} className="pointer-events-none">
                <div className="bg-black bg-opacity-75 text-white text-xs p-2 rounded max-w-sm break-words">
                  <strong>{regions.find((r) => r.id === hovered)?.name}</strong>
                </div>
              </Html>
            )}
          </Suspense>
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
      </div>
      <div
        className={`absolute top-4 right-4 bg-gray-900 bg-opacity-80 p-4 rounded w-64 text-base transform transition-transform duration-300 ${selectedRegion ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
        role="button"
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}
      >
        {selectedRegion && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

useGLTF.preload('/models/brain.glb');
export default BrainMap;
