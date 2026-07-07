"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ─── Canvas texture: book cover drawn at runtime ──────────────────────────────

function createCoverTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 720);
  grad.addColorStop(0, "#1a2f5a");
  grad.addColorStop(1, "#0c1a35");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 720);

  // Subtle dot grid
  ctx.fillStyle = "rgba(100,130,255,0.07)";
  for (let x = 0; x < 512; x += 48) {
    for (let y = 0; y < 720; y += 48) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Accent line
  ctx.fillStyle = "rgba(110,155,255,0.6)";
  ctx.fillRect(40, 58, 64, 3);

  // Main title
  ctx.fillStyle = "rgba(240,248,255,0.96)";
  ctx.font = "bold 56px Arial, sans-serif";
  ctx.fillText("DISTRIBUTED", 40, 250);
  ctx.fillText("SYSTEMS", 40, 316);

  // Subtitle
  ctx.fillStyle = "rgba(160,190,240,0.65)";
  ctx.font = "20px Arial, sans-serif";
  ctx.fillText("Designing, Building &", 40, 378);
  ctx.fillText("Operating at Scale", 40, 402);

  // Status badge
  ctx.fillStyle = "rgba(90,130,255,0.22)";
  ctx.fillRect(40, 450, 198, 30);
  ctx.fillStyle = "rgba(150,185,255,0.9)";
  ctx.font = "13px Courier New, monospace";
  ctx.fillText("// Writing in Progress", 48, 470);

  // Author
  ctx.fillStyle = "rgba(180,210,250,0.82)";
  ctx.font = "bold 24px Arial, sans-serif";
  ctx.fillText("J Suhas", 40, 660);

  return new THREE.CanvasTexture(canvas);
}

// ─── Book model ───────────────────────────────────────────────────────────────

interface BookModelProps {
  readonly isHovered: boolean;
  readonly reduced: boolean;
}

function BookModel({ isHovered, reduced }: BookModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coverTexture = useMemo(createCoverTexture, []);
  const hoverLerp = useRef(0);

  // Dispose the canvas texture when the component unmounts to free GPU memory.
  useEffect(() => {
    return () => {
      coverTexture.dispose();
    };
  }, [coverTexture]);

  useFrame(({ clock, pointer }) => {
    const g = groupRef.current;
    if (!g) return;

    if (!reduced) {
      g.position.y = Math.sin(clock.elapsedTime * 0.65) * 0.07;
    }

    // Mouse parallax — smooth lerp
    g.rotation.y = THREE.MathUtils.lerp(
      g.rotation.y,
      reduced ? 0.25 : pointer.x * 0.14 + 0.25,
      0.04,
    );
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      reduced ? -0.05 : -pointer.y * 0.08,
      0.04,
    );

    // Hover: slight forward lean
    hoverLerp.current = THREE.MathUtils.lerp(
      hoverLerp.current,
      isHovered ? 1 : 0,
      0.06,
    );
    g.rotation.x += hoverLerp.current * -0.06;
  });

  return (
    <group ref={groupRef}>
      {/*
       * BoxGeometry material order:
       *   0: +X (right)  — page edges, cream
       *   1: -X (left)   — spine, dark navy
       *   2: +Y (top)    — dark navy
       *   3: -Y (bottom) — dark navy
       *   4: +Z (front)  — cover texture
       *   5: -Z (back)   — back cover, dark navy
       */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2.8, 0.38]} />
        {/* page edges */}
        <meshStandardMaterial
          attach="material-0"
          color="#ede9df"
          roughness={0.95}
          metalness={0}
        />
        {/* spine */}
        <meshStandardMaterial
          attach="material-1"
          color="#0b1826"
          roughness={0.45}
          metalness={0.05}
        />
        {/* top */}
        <meshStandardMaterial
          attach="material-2"
          color="#0c1b30"
          roughness={0.5}
          metalness={0}
        />
        {/* bottom */}
        <meshStandardMaterial
          attach="material-3"
          color="#0c1b30"
          roughness={0.5}
          metalness={0}
        />
        {/* front cover — eslint-disable-next-line: @types/three version mismatch with R3F internals */}
        <meshStandardMaterial
          attach="material-4"
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          map={coverTexture as any}
          roughness={0.22}
          metalness={0.06}
        />
        {/* back cover */}
        <meshStandardMaterial
          attach="material-5"
          color="#091524"
          roughness={0.4}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

// ─── Scene contents (inside Canvas) ──────────────────────────────────────────

function BookSceneContent({ isHovered }: { readonly isHovered: boolean }) {
  const reduced = useReducedMotion();
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 5, 4]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 2, 4]} intensity={0.75} color="#8099ee" />
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.48}
        scale={5}
        blur={2.5}
        far={2}
      />
      <BookModel isHovered={isHovered} reduced={reduced} />
    </>
  );
}

// ─── Default export (dynamic-imported with ssr:false) ─────────────────────────

/**
 * 3D hardcover book scene.
 * Floating animation, mouse parallax, hover tilt.
 * Canvas texture renders the book cover design from code.
 */
export default function BookScene() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-full w-full"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0.6, 0.1, 5.8], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        aria-label="3D book preview: Distributed Systems by J Suhas"
      >
        <Suspense fallback={null}>
          <BookSceneContent isHovered={hovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
