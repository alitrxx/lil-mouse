"use client";

/**
 * NightMeadow — the foundational nighttime landscape illustration,
 * rendered from the reference artwork.
 *
 * The scene image is the top panel of the reference diptych, cropped to
 * exclude the divider line. We use the WebP version for size (112 KB
 * desktop, 27 KB mobile) with a PNG fallback.
 *
 * object-position: 33% 30% on desktop, 50% 30% on mobile — this aligns
 * the envelope's image position (33%, 30%) with the same viewport
 * coordinates, so the Envelope button (positioned at viewport 33% x 30%
 * on desktop, 50% x 30% on mobile) sits exactly on top of the envelope
 * in the image.
 *
 * When the letter is open:
 *  - The scene is dimmed (dark overlay)
 *  - The scene is slightly blurred (filter: blur)
 *  - But the scene remains visible behind the open letter
 */

import React from "react";

interface NightMeadowProps {
  /** Dim the scene behind the open letter for readability. */
  dimmed?: boolean;
  /** Subtle blur when the letter is open. */
  blurred?: boolean;
}

export const NightMeadow: React.FC<NightMeadowProps> = ({
  dimmed = false,
  blurred = false,
}) => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden transition-all duration-1000"
      style={{
        filter: blurred ? "blur(3px)" : "none",
      }}
    >
      {/* Desktop: landscape image, object-position centered on envelope */}
      <picture>
        <source srcSet="/images/scene-base.webp" />
        {/* Fallback <img> — uses desktop image, also serves as the
            non-WebP fallback. The CSS (in globals.css) sets
            object-position to keep the girl + envelope visible
            across viewport sizes. */}
        <img
          src="/images/scene-base.png"
          alt=""
          className="scene-image absolute inset-0 h-full w-full"
          draggable={false}
        />
      </picture>

      {/* Darkening overlay when letter is open */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundColor: "rgba(10, 15, 26, 0.55)",
          opacity: dimmed ? 1 : 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default NightMeadow;
