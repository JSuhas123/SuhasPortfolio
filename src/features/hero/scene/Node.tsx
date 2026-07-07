"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { GraphNode } from "../utils/graph";

interface NodeProps {
  readonly node: GraphNode;
  readonly isDark: boolean;
}

/**
 * A single network node rendered as a softly-glowing sphere.
 * Floats vertically and pulses scale on a per-node sine wave —
 * each node has a unique phase so the motion feels organic, not synchronised.
 */
export function Node({ node, isDark }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [px, py, pz] = node.position;

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.elapsedTime;
    // Gentle vertical float: max ±0.06 units
    mesh.position.y =
      py + Math.sin(t * node.pulseSpeed + node.pulsePhase) * 0.06;
    // Subtle scale breathe: max ±4%
    const s =
      1 + Math.sin(t * node.pulseSpeed * 0.7 + node.pulsePhase + 1.0) * 0.04;
    mesh.scale.setScalar(s);
  });

  const color = isDark ? "#9381ff" : "#6d5ce8";
  const emissive = isDark ? "#5d48f0" : "#4730c4";

  return (
    <mesh ref={meshRef} position={[px, py, pz]}>
      {/* 16 width / 10 height segments – good quality at low polygon count */}
      <sphereGeometry args={[node.radius, 16, 10]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.9}
        roughness={0.25}
        metalness={0.1}
      />
    </mesh>
  );
}
