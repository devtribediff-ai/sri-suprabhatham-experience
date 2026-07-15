import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Instanced trees composed of a cone canopy on a thin trunk. A vertex
 * shader wobble creates gentle wind — single draw call for the canopies
 * and a second for the trunks.
 */
export function TreeCluster({ positions }: { positions: Array<[number, number, number]> }) {
  const canopyRef = useRef<THREE.InstancedMesh>(null);
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = positions.length;

  useFrame((state) => {
    if (!canopyRef.current || !trunkRef.current) return;
    const t = state.clock.elapsedTime;
    positions.forEach(([x, y, z], i) => {
      const sway = Math.sin(t * 0.6 + i) * 0.03;
      dummy.position.set(x, y + 0.6, z);
      dummy.rotation.set(sway, i * 0.7, sway * 0.6);
      dummy.scale.setScalar(0.55 + (i % 3) * 0.08);
      dummy.updateMatrix();
      canopyRef.current!.setMatrixAt(i, dummy.matrix);

      dummy.rotation.set(0, 0, 0);
      dummy.position.set(x, y + 0.2, z);
      dummy.scale.set(0.05, 0.4, 0.05);
      dummy.updateMatrix();
      trunkRef.current!.setMatrixAt(i, dummy.matrix);
    });
    canopyRef.current.instanceMatrix.needsUpdate = true;
    trunkRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={canopyRef} args={[undefined, undefined, count]}>
        <coneGeometry args={[0.35, 0.9, 8]} />
        <meshStandardMaterial color="#3a4a34" roughness={0.85} metalness={0} />
      </instancedMesh>
      <instancedMesh ref={trunkRef} args={[undefined, undefined, count]}>
        <cylinderGeometry args={[1, 1, 1, 6]} />
        <meshStandardMaterial color="#3b2c1c" roughness={0.9} />
      </instancedMesh>
    </group>
  );
}
