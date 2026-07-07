"use client";

import dynamic from "next/dynamic";

const BookScene = dynamic(() => import("./BookScene"), {
  ssr: false,
  loading: () => (
    <div className="bg-surface-raised/30 flex h-full w-full items-center justify-center">
      <div className="h-48 w-36 rounded-lg bg-gradient-to-br from-[#1a2f5a] to-[#0c1a35] shadow-lg" />
    </div>
  ),
});

/**
 * Client-side wrapper that lazy-loads the Three.js BookScene.
 * Kept separate from FeaturedBook so that component can remain a
 * Server Component (ssr:false is only allowed in Client Components).
 */
export function BookSceneLoader() {
  return <BookScene />;
}
