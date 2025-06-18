/* eslint-disable react/no-unknown-property */
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { createPointsGeometry } from './createPointsGeometry';
import { RegionMarker } from './RegionMarker';
import type { BrainState } from './highlightRegions';

  activeState: BrainState;
  activeState: BrainState;
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
      className="bg-gray-800 p-6 rounded shadow-xl h-96 relative"
      role="button"
      tabIndex={0}
      onClick={() => setSelected(null)}
      onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}
    >
      <h2 className="text-xl font-semibold mb-2">Neural Visualization</h2>
      <div role="presentation" onClick={(e) => e.stopPropagation()}>
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.6} />
          <hemisphereLight intensity={0.4} groundColor="black" />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <Suspense fallback={null}>
            <primitive
              object={useGLTF('/models/brain.glb').scene}
              scale={1.2}
            />
            {regions.map((region) => (
              <RegionMarker
                key={region.id}
                region={region}
                activeState={activeState}
                hovered={hovered}
                selected={selected}
                setHovered={setHovered}
                setSelected={setSelected}
              />
            ))}
          </Suspense>
          <OrbitControls enablePan enableZoom enableRotate />
        </Canvas>
      </div>
      {selectedRegion && (
        <div
          className="absolute top-4 right-4 bg-gray-900 bg-opacity-80 p-4 rounded w-56 text-sm"
          role="button"
          tabIndex={0}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}
        >
          <h3 className="text-lg font-semibold">{selectedRegion.name}</h3>
          <p className="mt-1">{selectedRegion.role}</p>
          {selectedRegion.tooltip && (
            <p className="mt-2 text-xs">{selectedRegion.tooltip}</p>
          )}
          <button
            className="mt-3 text-xs underline text-teal-400"
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
