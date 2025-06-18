/* eslint-disable react/no-unknown-property */
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useState, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three-stdlib';

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

export function BrainPoints({
  count = 5000,
  activeState,
}: {
  count?: number;
  activeState: string;
}) {
  const { nodes, scene } = useGLTF('/models/brain.glb');
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const mesh =
      (nodes?.Brain as THREE.Mesh) ||
      (Array.isArray(scene.children)
        ? (scene.children[0] as THREE.Mesh)
        : undefined);
    if (!mesh?.geometry) return undefined;
    const sampler = new MeshSurfaceSampler(mesh).build();

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    const tempPosition = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      sampler.sample(tempPosition);
      positions.set(tempPosition.toArray(), i * 3);
      color.setHSL(0.6, 1, 0.5 + Math.random() * 0.2);
      colors.set([color.r, color.g, color.b], i * 3);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [count, nodes, scene]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.02,
        sizeAttenuation: true,
        vertexColors: true,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y += 0.002;
      if (activeState === 'Flow') {
        material.size = 0.02 + Math.sin(clock.getElapsedTime() * 2) * 0.005;
      }
    }
  });

  return (
    <group ref={group} scale={0.5}>
      <points geometry={geometry} material={material} />
    </group>
  );
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
          <primitive object={useGLTF('/models/brain.glb').scene} scale={1.2} />
          {regions.map((region) => (
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
                    hovered === region.id || selected === region.id ? 0.6 : 0.25
                  }
                  emissive={region.color}
                  emissiveIntensity={
                    hovered === region.id || selected === region.id ? 0.4 : 0.1
                  }
                />
              </mesh>
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
            </group>
          ))}
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/brain.glb');
