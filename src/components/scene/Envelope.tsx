"use client";

/**
 * Envelope — the sealed envelope the girl is holding.
 *
 * To preserve the purity of the scene illustration (no floating UI
 * envelope icon over the reference artwork), this component is a
 * TRANSPARENT clickable area covering the lower-left portion of the
 * viewport where the girl's envelope is in the scene.
 *
 * Interaction flow:
 *  1. Idle state: transparent clickable area + a subtle "click here"
 *     glow indicator positioned over the envelope area in the scene.
 *     The user sees only the scene (no envelope icon) — they click
 *     on the envelope that's already part of the illustration.
 *  2. Opening state: the SVG envelope APPEARS at the click position
 *     with the flap closed (fade-in), then immediately animates open
 *     (flap rotates, paper emerges).
 *  3. Opened: the parent transitions to the letter view.
 *
 * The SVG envelope appearance is brief — just enough to convey the
 * flap-opening animation before the letter view takes over.
 *
 * Keyboard accessible: Tab focuses the click area, Enter / Space
 * triggers open. The focus ring appears around the click area.
 */

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeProps {
  /** Called when the user opens the envelope. */
  onOpen: () => void;
  /** Force-open state for the parent (so it can drive the transition). */
  isOpening: boolean;
}

// The transparent clickable area covers the lower portion of the
// viewport where the girl is sitting in the scene.
const CLICK_AREA_CLASS =
  "absolute z-20 cursor-pointer " +
  // Full width on mobile, left half on desktop (where girl is on the left)
  "left-0 right-0 bottom-0 top-[40%] " +
  "sm:right-[50%]";

// Where the SVG envelope appears when clicked (in viewport %).
// On desktop: 25% x, 62% y (lower-left, girl's hands area)
// On mobile: 30% x, 65% y (slightly toward center, girl's hands area on mobile)
const ENVELOPE_POSITION_CLASS =
  "absolute z-30 left-[30%] top-[65%] sm:left-[25%] sm:top-[62%]";

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen, isOpening }) => {
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Record the click position so we can render the SVG envelope there
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setClickPos({ x, y });
      onOpen();
    },
    [onOpen]
  );

  return (
    <>
      {/* The transparent clickable area — covers the lower-left of the
          scene where the girl's envelope is. */}
      <button
        type="button"
        aria-label="باز کردن نامه — Enter یا Space را بزنید"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            // If no click position yet (keyboard activation), use the
            // center of the click area as the envelope position.
            setClickPos({ x: 50, y: 50 });
            onOpen();
          }
        }}
        className={`focus-ring block ${CLICK_AREA_CLASS}`}
        style={{ background: "transparent", border: "none" }}
        tabIndex={0}
      >
        {/* Subtle "click here" indicator — a small pulsing glow at the
            envelope's expected location in the scene. NOT a separate
            envelope icon, just a soft glow that hints "click here". */}
        <div
          aria-hidden="true"
          className="anim-hint pointer-events-none absolute"
          style={{
            // Position the glow at where the envelope is in the scene
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "60px",
            height: "80px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(224,232,160,0.15) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </button>

      {/* The SVG envelope that appears briefly at the click position
          when opening. */}
      <AnimatePresence>
        {isOpening && clickPos && (
          <motion.div
            className={`focus-ring pointer-events-none absolute z-30 ${ENVELOPE_POSITION_CLASS}`}
            initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.6 }}
            animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <EnvelopeSVG isOpening={isOpening} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/**
 * EnvelopeSVG — the small SVG envelope with the flap-opening animation.
 * Rendered only during the opening transition.
 */
const EnvelopeSVG: React.FC<{ isOpening: boolean }> = ({ isOpening }) => {
  return (
    <div className="anim-envelope relative" aria-hidden="true">
      <svg
        viewBox="0 0 110 140"
        width="80"
        height="100"
        style={{ filter: "drop-shadow(0 4px 8px rgba(5,10,15,0.7))" }}
      >
        <defs>
          <linearGradient id="envBodyAnim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8E4DC" />
            <stop offset="100%" stopColor="#D8D0C0" />
          </linearGradient>
          <filter id="envWobbleAnim" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="9" />
            <feDisplacementMap in="SourceGraphic" scale="1.0" />
          </filter>
        </defs>

        <g filter="url(#envWobbleAnim)">
          <rect x="15" y="30" width="80" height="100" rx="3" fill="url(#envBodyAnim)" stroke="#0A0F1A" strokeWidth="1.0" />
          <path d="M 15 30 L 55 90 L 95 30" fill="none" stroke="#0A0F1A" strokeWidth="0.7" opacity="0.3" />
          <g transform="translate(55, 95)">
            <circle r="8" fill="#1A2A44" stroke="#0A0F1A" strokeWidth="0.8" />
            <path d="M -3 -2 q 3 -3 6 0 q -3 3 -6 0 z" fill="#D9C58F" opacity="0.9" />
          </g>
        </g>

        <motion.g
          style={{ originX: "55px", originY: "30px" }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -170 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <path
            d="M 15 30 L 55 5 L 95 30 Z"
            fill="#D8D0C0"
            stroke="#0A0F1A"
            strokeWidth="1.0"
            filter="url(#envWobbleAnim)"
          />
          <path d="M 22 30 L 55 10 L 88 30" fill="none" stroke="#0A0F1A" strokeWidth="0.5" opacity="0.25" />
        </motion.g>

        <motion.rect
          x="25"
          y="40"
          width="60"
          height="80"
          rx="2"
          fill="#E8E4DC"
          stroke="#0A0F1A"
          strokeWidth="0.5"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -38, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
};

export default Envelope;
