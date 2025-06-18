import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three-stdlib';

export function createPointsGeometry(
  mesh: THREE.Mesh,
  count: number
): THREE.BufferGeometry {
  const sampler = new MeshSurfaceSampler(mesh).build();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();
  const temp = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    sampler.sample(temp);
    positions.set(temp.toArray(), i * 3);
    color.setHSL(0.6, 1, 0.5 + Math.random() * 0.2);
    colors.set([color.r, color.g, color.b], i * 3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}
