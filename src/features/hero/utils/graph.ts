/**
 * Static network graph topology for the hero Three.js scene.
 *
 * 14 nodes arranged as a distributed system topology:
 *   • 1  hub  node   (represents the core service)
 *   • 4  inner nodes (primary services)
 *   • 6  outer nodes (secondary services)
 *   • 3  peripheral  (edge / external nodes)
 *
 * Positions are hand-crafted for a visually balanced composition
 * across a ~10-unit viewing frustum at camera z=10, fov=50.
 */

export interface GraphNode {
  readonly id: number;
  readonly position: [number, number, number];
  readonly radius: number;
  readonly pulseSpeed: number;
  readonly pulsePhase: number;
}

export interface GraphConnection {
  readonly id: string;
  readonly fromId: number;
  readonly toId: number;
  /** 0-1 base opacity; scaled further in Connection component */
  readonly opacity: number;
}

export interface PacketRoute {
  readonly connId: string;
  /** 0–1 phase offset — staggers packets so they don't all start at the same position */
  readonly delay: number;
  /** Traversal speed: 1/speed ≈ seconds per full traversal */
  readonly speed: number;
}

export const NETWORK = {
  nodes: [
    // Hub
    {
      id: 0,
      position: [0, 0, 0] as [number, number, number],
      radius: 0.14,
      pulseSpeed: 0.4,
      pulsePhase: 0,
    },
    // Inner ring
    {
      id: 1,
      position: [2.0, 0.6, 0.4] as [number, number, number],
      radius: 0.09,
      pulseSpeed: 0.5,
      pulsePhase: 1.2,
    },
    {
      id: 2,
      position: [-1.8, 0.8, -0.3] as [number, number, number],
      radius: 0.09,
      pulseSpeed: 0.45,
      pulsePhase: 2.5,
    },
    {
      id: 3,
      position: [0.3, -1.9, 0.6] as [number, number, number],
      radius: 0.09,
      pulseSpeed: 0.55,
      pulsePhase: 0.7,
    },
    {
      id: 4,
      position: [-0.5, 1.7, -0.4] as [number, number, number],
      radius: 0.09,
      pulseSpeed: 0.48,
      pulsePhase: 3.1,
    },
    // Outer ring
    {
      id: 5,
      position: [3.6, -0.3, -0.8] as [number, number, number],
      radius: 0.07,
      pulseSpeed: 0.6,
      pulsePhase: 1.8,
    },
    {
      id: 6,
      position: [-3.4, -0.8, 0.5] as [number, number, number],
      radius: 0.07,
      pulseSpeed: 0.55,
      pulsePhase: 0.4,
    },
    {
      id: 7,
      position: [1.5, 3.0, -0.6] as [number, number, number],
      radius: 0.07,
      pulseSpeed: 0.52,
      pulsePhase: 2.1,
    },
    {
      id: 8,
      position: [-2.2, 2.6, 0.2] as [number, number, number],
      radius: 0.07,
      pulseSpeed: 0.58,
      pulsePhase: 4.2,
    },
    {
      id: 9,
      position: [3.0, 2.2, 1.0] as [number, number, number],
      radius: 0.07,
      pulseSpeed: 0.62,
      pulsePhase: 1.0,
    },
    {
      id: 10,
      position: [0.2, -3.3, -1.2] as [number, number, number],
      radius: 0.07,
      pulseSpeed: 0.5,
      pulsePhase: 3.7,
    },
    // Peripheral
    {
      id: 11,
      position: [-4.3, 1.5, -1.0] as [number, number, number],
      radius: 0.055,
      pulseSpeed: 0.65,
      pulsePhase: 0.9,
    },
    {
      id: 12,
      position: [4.0, -2.5, 0.4] as [number, number, number],
      radius: 0.055,
      pulseSpeed: 0.7,
      pulsePhase: 2.8,
    },
    {
      id: 13,
      position: [-1.2, -3.6, 0.8] as [number, number, number],
      radius: 0.055,
      pulseSpeed: 0.68,
      pulsePhase: 5.1,
    },
  ] satisfies readonly GraphNode[],

  connections: [
    // Hub → inner
    { id: "0-1", fromId: 0, toId: 1, opacity: 0.65 },
    { id: "0-2", fromId: 0, toId: 2, opacity: 0.65 },
    { id: "0-3", fromId: 0, toId: 3, opacity: 0.65 },
    { id: "0-4", fromId: 0, toId: 4, opacity: 0.65 },
    // Inner → outer
    { id: "1-5", fromId: 1, toId: 5, opacity: 0.45 },
    { id: "1-9", fromId: 1, toId: 9, opacity: 0.45 },
    { id: "2-6", fromId: 2, toId: 6, opacity: 0.45 },
    { id: "2-7", fromId: 2, toId: 7, opacity: 0.45 },
    { id: "3-5", fromId: 3, toId: 5, opacity: 0.4 },
    { id: "3-10", fromId: 3, toId: 10, opacity: 0.45 },
    { id: "4-7", fromId: 4, toId: 7, opacity: 0.4 },
    { id: "4-8", fromId: 4, toId: 8, opacity: 0.45 },
    // Outer → outer
    { id: "5-6", fromId: 5, toId: 6, opacity: 0.3 },
    { id: "8-9", fromId: 8, toId: 9, opacity: 0.3 },
    // Outer → peripheral
    { id: "1-11", fromId: 1, toId: 11, opacity: 0.25 },
    { id: "6-12", fromId: 6, toId: 12, opacity: 0.25 },
    { id: "10-13", fromId: 10, toId: 13, opacity: 0.25 },
  ] satisfies readonly GraphConnection[],
} as const;

/** Connections that carry animated data packets. */
export const PACKET_ROUTES: readonly PacketRoute[] = [
  { connId: "0-1", delay: 0.0, speed: 0.07 },
  { connId: "0-3", delay: 0.3, speed: 0.06 },
  { connId: "1-5", delay: 0.6, speed: 0.08 },
  { connId: "2-7", delay: 0.15, speed: 0.065 },
  { connId: "4-8", delay: 0.75, speed: 0.07 },
];
