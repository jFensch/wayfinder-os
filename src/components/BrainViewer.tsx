/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent } from '@/components/ui/card';

/**
 * BrainModel loads a 3D brain GLTF and applies highlighting
 * @param {Array<string>} highlightRegions - names of regions to emphasize
 */
function BrainModel({
  highlightRegions = [],
}: {
  highlightRegions?: string[];
}) {
  const gltf = useGLTF('/models/brain.glb');
  const group = useRef<THREE.Group>(null);

  // subtle rotation animation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  // apply highlight on regions
  React.useEffect(() => {
    gltf.scene.traverse((child: THREE.Object3D) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (highlightRegions.includes(mesh.name)) {
          mat.emissiveIntensity = 0.8;
          mat.emissive.setHex(0xffd54f);
        } else {
          mat.emissiveIntensity = 0;
        }
        mat.transparent = true;
        mat.opacity = highlightRegions.length
          ? highlightRegions.includes(mesh.name)
            ? 1
            : 0.5
          : 1;
      }
    });
  }, [gltf, highlightRegions]);

  return <primitive ref={group} object={gltf.scene} scale={1.2} />;
}

/**
 * BrainViewer displays the 3D brain in a styled card and replaces previous card UI
 * @param {Array<string>} highlightedRegions - optional regions to emphasize
 */
export default function BrainViewer({
  highlightedRegions = [],
}: {
  highlightedRegions?: string[];
}) {
  return (
    <Card className="w-full h-[600px] rounded-2xl shadow-md">
      <CardContent className="p-0 w-full h-full">
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={0.8} />
          <Suspense fallback={null}>
            <BrainModel highlightRegions={highlightedRegions} />
          </Suspense>
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
      </CardContent>
    </Card>
  );
}

useGLTF.preload('/models/brain.glb');
