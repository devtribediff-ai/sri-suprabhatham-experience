import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Html, useProgress } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { projects } from "@/lib/projects.data";
import { ProjectMonolith } from "./ProjectMonolith";
import { DustMotes } from "@/components/world/DustMotes";
import { TreeCluster } from "@/components/world/TreeCluster";
import { useReducedMotionPreference, useIsLowEnd } from "@/lib/device";
import { sriEase } from "@/lib/motion";

/** Framing shot camera director — orbits idly, flies-to on selection. */
function CameraDirector({
  target,
  flying,
  onArrived,
}: {
  target: [number, number, number] | null;
  flying: boolean;
  onArrived: () => void;
}) {
  const { camera } = useThree();
  const anchor = useRef(new THREE.Vector3(0, 5.5, 12));
  const focus = useRef(new THREE.Vector3(0, 1.5, 0));
  const flyStart = useRef<number | null>(null);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (flying && target) {
      if (flyStart.current === null) flyStart.current = t;
      const elapsed = t - flyStart.current;
      const dur = 2.6;
      const p = Math.min(1, elapsed / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const goalPos = new THREE.Vector3(target[0] * 0.7, target[1] + 1.4, target[2] + 2.2);
      const goalLook = new THREE.Vector3(target[0], target[1], target[2]);
      camera.position.lerp(goalPos, eased * 0.15 + 0.02);
      focus.current.lerp(goalLook, eased * 0.15 + 0.02);
      camera.lookAt(focus.current);
      if (p >= 1) onArrived();
      return;
    }
    // Idle slow orbit
    const radius = 12;
    const angle = t * 0.05;
    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    camera.position.y = 5.5 + Math.sin(t * 0.1) * 0.3;
    focus.current.set(0, 1.2, 0);
    camera.lookAt(focus.current);
  });

  useEffect(() => { flyStart.current = null; }, [flying]);
  return null;
}

function LoadingOverlay() {
  const { progress, active } = useProgress();
  if (!active && progress >= 100) return null;
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-ivory">
        <div className="h-px w-40 overflow-hidden bg-brass/25">
          <div
            className="h-full bg-brass"
            style={{ width: `${progress}%`, transition: "width 400ms ease-out" }}
          />
        </div>
        <span className="eyebrow text-brass-glow">{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

function CityScene({
  hovered,
  setHovered,
  onSelect,
  focusedSlug,
  reduced,
}: {
  hovered: string | null;
  setHovered: (s: string | null) => void;
  onSelect: (s: string) => void;
  focusedSlug: string | null;
  reduced: boolean;
}) {
  const trees = useMemo<Array<[number, number, number]>>(() => {
    const pts: Array<[number, number, number]> = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const r = 5.5 + Math.random() * 1.5;
      pts.push([Math.cos(angle) * r, 0.1, Math.sin(angle) * r]);
    }
    return pts;
  }, []);

  return (
    <>
      {/* Warm interior HDRI */}
      <Environment preset="apartment" background={false} environmentIntensity={0.75} />

      {/* Key & fill */}
      <directionalLight
        position={[6, 8, 4]}
        intensity={1.4}
        color="#fff2d0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#8ea3c0" />
      <ambientLight intensity={0.35} />

      {/* Bronze plinth base */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[8.5, 8.8, 0.15, 64]} />
        <meshStandardMaterial color="#3a2e20" roughness={0.55} metalness={0.5} />
      </mesh>
      {/* Marble top surface */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[8.2, 8.2, 0.02, 64]} />
        <meshPhysicalMaterial
          color="#efe7d6"
          roughness={0.35}
          metalness={0}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
          envMapIntensity={1}
        />
      </mesh>
      {/* Brass ring */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8.15, 8.22, 96]} />
        <meshStandardMaterial color="#c4964a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Water reflection pool (single quad using MeshPhysicalMaterial) */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[7.8, 96]} />
        <meshPhysicalMaterial
          color="#f0e8d7"
          roughness={0.15}
          metalness={0}
          transparent
          opacity={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Trees around perimeter */}
      <TreeCluster positions={trees} />

      {/* Monoliths */}
      {projects.map((p) => (
        <ProjectMonolith
          key={p.slug}
          project={p}
          onHover={setHovered}
          onSelect={onSelect}
          focused={focusedSlug === p.slug}
        />
      ))}

      {/* Dust */}
      {!reduced && <DustMotes count={200} bounds={10} />}

      <ContactShadows position={[0, 0.04, 0]} opacity={0.55} scale={20} blur={2} far={4} resolution={512} />
    </>
  );
}

/**
 * Miniature city — Act III. R3F canvas with 5 project monoliths, a marble
 * plinth, brass ring, trees, dust motes, and a cinematic camera director.
 */
export function MiniatureCity() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [flying, setFlying] = useState(false);
  const [target, setTarget] = useState<[number, number, number] | null>(null);
  const [focusedSlug, setFocusedSlug] = useState<string | null>(null);
  const navigate = useNavigate();
  const reduced = useReducedMotionPreference();
  const lowEnd = useIsLowEnd();

  const onSelect = (slug: string) => {
    const p = projects.find((x) => x.slug === slug);
    if (!p) return;
    if (reduced) {
      navigate({ to: "/projects/$slug", params: { slug } });
      return;
    }
    setFocusedSlug(slug);
    setTarget([p.cityCoord.x, p.cityCoord.height / 2, p.cityCoord.z]);
    setFlying(true);
  };

  return (
    <div className="relative isolate h-[92dvh] w-full overflow-hidden bg-obsidian">
      {/* Fallback still for reduced-motion / low-end */}
      {reduced && (
        <StillCity onSelect={(s) => navigate({ to: "/projects/$slug", params: { slug: s } })} />
      )}
      {!reduced && (
        <Canvas
          shadows
          dpr={lowEnd ? [1, 1.2] : [1, 2]}
          camera={{ position: [0, 5.5, 12], fov: 40 }}
          gl={{ antialias: true, alpha: false }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor("#0e0d0b");
            scene.fog = new THREE.Fog("#0e0d0b", 18, 42);
          }}
        >
          <Suspense fallback={<LoadingOverlay />}>
            <CityScene
              hovered={hovered}
              setHovered={setHovered}
              onSelect={onSelect}
              focusedSlug={focusedSlug}
              reduced={reduced}
            />
            <CameraDirector
              target={target}
              flying={flying}
              onArrived={() => {
                if (focusedSlug) {
                  navigate({ to: "/projects/$slug", params: { slug: focusedSlug } });
                }
              }}
            />
            {!lowEnd && (
              <EffectComposer multisampling={0}>
                <Bloom mipmapBlur intensity={0.8} luminanceThreshold={0.7} luminanceSmoothing={0.4} />
                <Vignette eskil={false} offset={0.2} darkness={0.75} />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      )}

      {/* HUD — hovered project label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: sriEase }}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-ivory"
          >
            <p className="eyebrow text-brass-glow">
              {projects.find((p) => p.slug === hovered)?.location}
            </p>
            <p className="mt-1 font-display text-4xl">{projects.find((p) => p.slug === hovered)?.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.32em] text-ivory/50">
              {projects.find((p) => p.slug === hovered)?.status}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cross-dissolve flight veil */}
      <AnimatePresence>
        {flying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.4, delay: 1.2, ease: sriEase }}
            className="pointer-events-none absolute inset-0 z-30 bg-obsidian"
          />
        )}
      </AnimatePresence>

      {/* Top hairline hint */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-24">
        <p className="eyebrow text-ivory/40">Hover · Click · Fly</p>
      </div>
    </div>
  );
}

function StillCity({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <div className="grid h-full w-full place-items-center p-10">
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <button
              onClick={() => onSelect(p.slug)}
              className="w-full border border-brass/30 bg-obsidian/60 p-6 text-left text-ivory transition-colors hover:border-brass hover:text-brass"
            >
              <p className="eyebrow text-brass-glow">{p.location}</p>
              <p className="mt-2 font-display text-3xl">{p.name}</p>
              <p className="mt-1 text-sm text-ivory/60">{p.tagline}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
