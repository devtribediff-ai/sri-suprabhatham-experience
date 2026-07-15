/**
 * PBR material presets used across R3F scenes. Keep this tiny — one
 * factory per material, memoized at call-site with useMemo. Values tuned
 * for warm-white interior HDRI intensity.
 */
import * as THREE from "three";

export function marbleMaterial(color = "#f0ebe1") {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.35,
    metalness: 0,
    clearcoat: 0.4,
    clearcoatRoughness: 0.25,
    sheen: 0.15,
    sheenColor: new THREE.Color("#fff6e5"),
    envMapIntensity: 0.8,
  });
}

export function brassMaterial(emissiveBoost = 0) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#c4964a"),
    metalness: 0.95,
    roughness: 0.32,
    emissive: new THREE.Color("#c4964a"),
    emissiveIntensity: emissiveBoost,
    envMapIntensity: 1.2,
  });
}

export function glassMaterial(color = "#0b0906") {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0,
    roughness: 0.08,
    transmission: 0.9,
    thickness: 0.3,
    ior: 1.48,
    reflectivity: 0.5,
    envMapIntensity: 1.5,
  });
}

export function concreteMaterial(color = "#d6cec2") {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.85,
    metalness: 0,
    envMapIntensity: 0.5,
  });
}

export function warmLightMaterial() {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color("#ffe4a3"),
    toneMapped: false,
  });
}
