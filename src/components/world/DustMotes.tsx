import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * GPU-instanced dust motes for R3F scenes. 300 sprites, single draw call.
 * Slowly drifts with a sine-based wander.
 */
export function DustMotes({ count = 300, bounds = 12 }: { count?: number; bounds?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * bounds * 2,
      y: Math.random() * bounds,
      z: (Math.random() - 0.5) * bounds * 2,
      p: Math.random() * Math.PI * 2,
      s: 0.008 + Math.random() * 0.014,
    }));
  }, [count, bounds]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const seed = seeds[i];
      dummy.position.set(
        seed.x + Math.sin(t * 0.15 + seed.p) * 0.6,
        seed.y + Math.sin(t * 0.1 + seed.p * 2) * 0.4 + (t * 0.06 % 6) * 0.05,
        seed.z + Math.cos(t * 0.12 + seed.p) * 0.6,
      );
      dummy.scale.setScalar(seed.s);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#ffe6b5" transparent opacity={0.55} toneMapped={false} />
    </instancedMesh>
  );
}
