"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { NETWORK, PACKET_ROUTES } from "../utils/graph";
import { Connection } from "./Connection";
import { Node } from "./Node";
import { Packet } from "./Packet";

interface NetworkGraphProps {
  readonly isDark: boolean;
  readonly isMobile: boolean;
}

/**
 * The complete Three.js scene graph.
 * Camera parallax is driven here via useFrame so it runs on the render loop
 * and never triggers a React re-render.
 *
 * Mobile: only the hub + inner ring (5 nodes) and hub connections.
 * Desktop: full 14-node network with animated data packets.
 */
export function NetworkGraph({ isDark, isMobile }: NetworkGraphProps) {
  // Build a fast id→position lookup once
  const nodeMap = useMemo(() => {
    const map = new Map<number, [number, number, number]>();
    for (const node of NETWORK.nodes) {
      map.set(node.id, node.position);
    }
    return map;
  }, []);

  const displayNodes = isMobile ? NETWORK.nodes.slice(0, 5) : NETWORK.nodes;
  const displayConnections = isMobile
    ? NETWORK.connections.filter((c) => c.fromId === 0)
    : NETWORK.connections;

  // Camera smooth-follow: uses THREE.MathUtils.lerp inside the render loop
  useFrame((state) => {
    const cam = state.camera;
    // state.pointer replaced state.mouse in R3F v9 (normalised -1..1)
    cam.position.x = THREE.MathUtils.lerp(
      cam.position.x,
      state.pointer.x * 0.7,
      0.025,
    );
    cam.position.y = THREE.MathUtils.lerp(
      cam.position.y,
      -state.pointer.y * 0.4,
      0.025,
    );
    cam.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* Subtle ambient light keeps dark-mode nodes visible */}
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      {/* Soft point light accentuates the emissive glow */}
      <pointLight position={[0, 0, 6]} intensity={isDark ? 0.6 : 0.4} />

      {/* Connections — rendered first so nodes sit on top */}
      {displayConnections.map((conn) => {
        const fromPos = nodeMap.get(conn.fromId);
        const toPos = nodeMap.get(conn.toId);
        if (!fromPos || !toPos) return null;
        return (
          <Connection
            key={conn.id}
            start={fromPos}
            end={toPos}
            opacity={conn.opacity}
            isDark={isDark}
          />
        );
      })}

      {/* Nodes */}
      {displayNodes.map((node) => (
        <Node key={node.id} node={node} isDark={isDark} />
      ))}

      {/* Data packets — desktop only */}
      {!isMobile &&
        PACKET_ROUTES.map((route) => {
          const conn = NETWORK.connections.find((c) => c.id === route.connId);
          if (!conn) return null;
          const fromPos = nodeMap.get(conn.fromId);
          const toPos = nodeMap.get(conn.toId);
          if (!fromPos || !toPos) return null;
          return (
            <Packet
              key={route.connId}
              start={fromPos}
              end={toPos}
              delay={route.delay}
              speed={route.speed}
              isDark={isDark}
            />
          );
        })}
    </group>
  );
}
