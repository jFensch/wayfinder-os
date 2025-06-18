/* eslint-disable react/no-unknown-property */
import { Html, useGLTF } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { highlightRegions } from './highlightRegions';

type Region = {
  id: string;
  name: string;
  role: string;
  color: string;
  position: [number, number, number];
  tooltip?: string;
};

type Props = {
  region: Region;
  activeState: string;
  hovered: string | null;
  selected: string | null;
  setHovered: (id: string | null) => void;
  setSelected: (id: string | null) => void;
};

export function RegionMarker({
  region,
  activeState,
  hovered,
  selected,
  setHovered,
  setSelected,
}: Props) {
  const { nodes } = useGLTF('/models/brain.glb');
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const mesh = nodes[
    `${region.id.charAt(0).toUpperCase()}${region.id.slice(1)}`
  ] as THREE.Mesh | undefined;

  const isHighlighted = highlightRegions[activeState]?.includes(region.id);
  const isHoverSel = hovered === region.id || selected === region.id;

  const style = useMemo(() => {
    let color = region.color;
    let opacity = isHoverSel ? 0.6 : 0.25;
    let emissiveIntensity = isHoverSel ? 0.4 : 0.1;

    switch (activeState) {
      case 'Anxious':
        if (isHighlighted) {
          color = '#ff6666';
          emissiveIntensity = 0.8;
        } else {
          color = '#884444';
          emissiveIntensity *= 0.3;
          opacity *= 0.8;
        }
        break;
      case 'Flow':
        if (isHighlighted) {
          color = '#66ffb2';
          emissiveIntensity = 0.6;
        }
        break;
      case 'Sad':
        color = '#6a7bd1';
        emissiveIntensity *= 0.2;
        opacity *= 0.7;
        break;
      case 'Shutdown':
        color = '#333333';
        emissiveIntensity *= 0.05;
        opacity *= 0.4;
        break;
      default:
        break;
    }

    return { color, opacity, emissiveIntensity };
  }, [activeState, isHighlighted, isHoverSel, region.color]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      if (activeState === 'Flow' && isHighlighted) {
        materialRef.current.emissiveIntensity =
          0.6 + Math.sin(clock.getElapsedTime() * 4) * 0.3;
      } else {
        materialRef.current.emissiveIntensity = style.emissiveIntensity;
      }
    }
  });

  if (!mesh) return null;

  return (
    <mesh
      geometry={mesh.geometry}
      position={[mesh.position.x, mesh.position.y, mesh.position.z]}
      rotation={[mesh.rotation.x, mesh.rotation.y, mesh.rotation.z]}
      scale={[mesh.scale.x, mesh.scale.y, mesh.scale.z]}
      onPointerOver={() => setHovered(region.id)}
      onPointerOut={() => setHovered(null)}
      onClick={() => setSelected(region.id)}
    >
      <meshStandardMaterial
        ref={materialRef}
        color={style.color}
        transparent
        opacity={style.opacity}
        emissive={style.color}
        emissiveIntensity={style.emissiveIntensity}
      />
      {(hovered === region.id || selected === region.id) && (
        <Html distanceFactor={8} transform className="pointer-events-none">
          <div className="bg-black bg-opacity-75 text-white text-xs p-2 rounded max-w-xs">
            <strong>{region.name}</strong>
            <br />
            {region.role}
            {region.tooltip && <p className="mt-1">{region.tooltip}</p>}
          </div>
        </Html>
      )}
    </mesh>
  );
}
