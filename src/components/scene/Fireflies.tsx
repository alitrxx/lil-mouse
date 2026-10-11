"use client";

/**
 * Fireflies — a small set of warm, glowing fireflies drifting through the scene.
 *
 * Per the reference:
 *  - Color is warm yellow-green / pale gold (#E0E8A0)
 *  - 8-10 fireflies scattered in the lower-left and center, floating in the
 *    grass and lower air space around the girl
 *  - Each firefly is a small point of light with a soft glow halo
 *
 * Two layers per firefly:
 *  - an outer glow (CSS box-shadow pulse via .anim-glow)
 *  - a slow drift along a unique path (.anim-firefly-1/2/3)
 *
 * Each firefly is rendered once and animated purely by CSS, so the React
 * tree does not re-render to drive them. Respects prefers-reduced-motion.
 */

import React, { useMemo } from "react";

interface Firefly {
  x: number;
  y: number;
  variant: 1 | 2 | 3;
  delay: string;
  size: number;
}

// Distribute around the girl (lower-left quadrant on desktop, centered on
// envelope area on mobile) — keep them subtle and small.
const FIREFLIES: Firefly[] = [
  { x: 14, y: 70, variant: 1, delay: "0s",   size: 3 },
  { x: 22, y: 78, variant: 2, delay: "0.8s", size: 4 },
  { x: 28, y: 68, variant: 3, delay: "1.4s", size: 3 },
  { x: 36, y: 76, variant: 1, delay: "0.4s", size: 3 },
  { x: 44, y: 70, variant: 2, delay: "1.8s", size: 4 },
  { x: 52, y: 78, variant: 3, delay: "0.6s", size: 3 },
  { x: 60, y: 72, variant: 1, delay: "2.2s", size: 3 },
  { x: 70, y: 80, variant: 2, delay: "0.2s", size: 4 },
  { x: 78, y: 74, variant: 3, delay: "1.2s", size: 3 },
  { x: 10, y: 62, variant: 2, delay: "1.0s", size: 3 },
];

export const Fireflies: React.FC = () => {
  const flies = useMemo(() => FIREFLIES, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {flies.map((f, i) => (
        <div
          key={`firefly-${i}`}
          className={`absolute anim-firefly-${f.variant}`}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            animationDelay: f.delay,
            willChange: "transform",
          }}
        >
          <div
            className={`anim-glow rounded-full`}
            style={{
              width: `${f.size}px`,
              height: `${f.size}px`,
              backgroundColor: "#E0E8A0",
              animationDelay: f.delay,
              willChange: "opacity, box-shadow",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Fireflies;
