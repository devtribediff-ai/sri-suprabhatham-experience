import { useFrame } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Project } from "@/lib/projects.schema";

/**
 * A single glowing architectural monolith on the city plinth. Renders
 * with instanced windows and a soft brass rim. Idle: 1 window pulses.
 * Hover / focus: window grid sequences to fully lit, balconies illuminate,
 * garden path glows, camera dolly-in handled by parent director.
 */
interface Props {
  project: Project;
  onHover?: (slug: string | null) => void;
  onSelect?: (slug: string) => void;
  focused?: boolean;
}

export function ProjectMonolith({ project, onHover, onSelect, focused = false }: Props) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || focused;
  const { x, z, height, width, depth, rotationY = 0 } = project.cityCoord;

  const accentColor = useMemo(() => new THREE.Color(project.accent ?? "#c4964a"), [project.accent]);

  const spring = useSpring({
    scale: active ? 1.05 : 1,
    lift: active ? 0.12 : 0,
    glow: active ? 1.3 : 0.2,
    config: { mass: 1, tension: 130, friction: 22 },
  });

  const windowRef = useRef<THREE.InstancedMesh>(null);
  const rows = Math.max(3, Math.floor(height * 2));
  const cols = 4;
  const winCount = rows * cols * 4; // 4 façades

  useFrame((state) => {
    if (!windowRef.current) return;
    const t = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();
    let idx = 0;
    const facadeSpecs: Array<[number, number, number, number]> = [
      // dx, dz, sign_x, sign_z (which face)
      [0, depth / 2 + 0.001, 1, 0],
      [0, -depth / 2 - 0.001, -1, 0],
      [width / 2 + 0.001, 0, 0, 1],
      [-width / 2 - 0.001, 0, 0, -1],
    ];
    for (const [fdx, fdz, sx] of facadeSpecs) {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const yOff = 0.4 + r * (height / rows) - height / 2;
          const xOff = (c - (cols - 1) / 2) * (width / (cols + 0.5));
          // Which axis is spread along depends on facade orientation
          if (sx === 1 || sx === -1) {
            dummy.position.set(fdx, yOff, xOff);
            dummy.rotation.set(0, Math.PI / 2, 0);
          } else {
            dummy.position.set(xOff, yOff, fdz);
            dummy.rotation.set(0, 0, 0);
          }
          const pulseSeed = (r * 7 + c * 3) % 11;
          const pulse = active
            ? 1
            : 0.15 + Math.max(0, Math.sin(t * 1.3 + pulseSeed) - 0.85) * 8;
          const s = 0.045;
          dummy.scale.set(s, s * 1.6, 0.005);
          dummy.updateMatrix();
          windowRef.current!.setMatrixAt(idx, dummy.matrix);
          const col = new THREE.Color("#ffd48b").multiplyScalar(pulse);
          windowRef.current!.setColorAt(idx, col);
          idx++;
        }
      }
    }
    windowRef.current.instanceMatrix.needsUpdate = true;
    if (windowRef.current.instanceColor) windowRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <animated.group
      position-x={x}
      position-z={z}
      rotation-y={rotationY}
      position-y={spring.lift}
      scale={spring.scale}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover?.(project.slug); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); onHover?.(null); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onSelect?.(project.slug); }}
    >
      {/* Base plinth */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[width + 0.4, 0.1, depth + 0.4]} />
        <meshStandardMaterial color="#2a2620" roughness={0.6} metalness={0.15} />
      </mesh>

      {/* Tower */}
      <mesh position={[0, height / 2 + 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial
          color="#f5efe4"
          roughness={0.55}
          metalness={0.05}
          clearcoat={0.3}
          clearcoatRoughness={0.4}
          envMapIntensity={0.9}
        />
      </mesh>

      {/* Windows (instanced across 4 façades) */}
      <group position={[0, height / 2 + 0.1, 0]}>
        <instancedMesh ref={windowRef} args={[undefined, undefined, winCount]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#ffd48b" toneMapped={false} />
        </instancedMesh>
      </group>

      {/* Rooftop brass cap */}
      <mesh position={[0, height + 0.15, 0]}>
        <boxGeometry args={[width * 0.6, 0.06, depth * 0.6]} />
        <meshStandardMaterial color="#c4964a" metalness={0.85} roughness={0.35} />
      </mesh>

      {/* Balcony ribbons (visible when active) */}
      <animated.mesh
        position={[0, height * 0.5 + 0.1, 0]}
        scale={spring.glow.to((g) => [1, 1, 1] as unknown as number)}
      >
        <boxGeometry args={[width + 0.2, 0.03, depth + 0.2]} />
        <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.4} />
      </animated.mesh>

      {/* Rim light (point) */}
      <animated.pointLight
        position={[0, height * 0.85, 0]}
        color={accentColor}
        intensity={spring.glow}
        distance={4}
      />

      {/* Garden path around plinth */}
      <animated.mesh position={[0, 0.06, depth / 2 + 0.4]}>
        <planeGeometry args={[width * 0.9, 0.02]} />
        <animated.meshBasicMaterial
          color={accentColor}
          transparent
          opacity={spring.glow.to((g: number) => g * 0.6)}
          toneMapped={false}
        />
      </animated.mesh>
    </animated.group>
  );
}
