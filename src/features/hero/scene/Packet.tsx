"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface PacketProps {
  readonly start: [number, number, number];
  readonly end: [number, number, number];
  /** 0–1 phase offset; staggers the packet from others on different connections */
  readonly delay: number;
  /** Lower = slower. 0.07 ≈ 14 s per traversal (calm, deliberate) */
  readonly speed: number;
  readonly isDark: boolean;
}

/** Smooth-step easing: starts slow, accelerates, then slows again. */
function smoothStep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * A small sphere that travels along a connection to represent data in-flight.
 * Position and opacity are updated imperatively in useFrame — no React state
 * is allocated per frame, keeping render overhead near zero.
 */
export function Packet({ start, end, delay, speed, isDark }: PacketProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  const [sx, sy, sz] = start;
  const [ex, ey, ez] = end;

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;

    // Cycle 0→1 continuously, offset by delay phase
    const raw = (clock.elapsedTime * speed + delay) % 1;
    const progress = smoothStep(raw);

    // Fade in and out with sine so the packet appears and disappears cleanly
    mat.opacity = Math.sin(raw * Math.PI) * 0.85;

    mesh.position.set(
      sx + (ex - sx) * progress,
      sy + (ey - sy) * progress,
      sz + (ez - sz) * progress,
    );
  });

  const color = isDark ? "#c4b5fd" : "#7c3aed";

  return (
    <mesh ref={meshRef} position={[sx, sy, sz]}>
      <sphereGeometry args={[0.04, 8, 6]} />
      <meshBasicMaterial ref={matRef} color={color} transparent opacity={0} />
    </mesh>
  );
}
