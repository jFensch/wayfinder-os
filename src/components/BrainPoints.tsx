/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three-stdlib';

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

  if (!geometry) return null;

  return (
    <group ref={group} scale={0.5}>
      <points geometry={geometry} material={material} />
    </group>
  );
}
