"use client";

/**
 * Page — the entire single-purpose Girls' Day gift experience.
 *
 * State machine:
 *   "idle"      → the meadow scene is shown with the sealed envelope in
 *                 the girl's hands; a small Persian hint invites the
 *                 visitor to click.
 *   "opening"   → envelope flap opens, paper emerges, the original
 *                 background remains visible.
 *   "letter"    → the cream paper (with envelope flaps folded outward
 *                 and the wax seal at the bottom) sits in the foreground
 *                 over the (dimmed, slightly blurred) meadow; the full
 *                 Persian message is revealed with subtle motion.
 *
 * Closing returns to "idle" with a smooth reverse transition.
 *
 * The scene is rendered from the reference artwork (the top panel of
 * the original diptych). The interactive envelope overlays the image's
 * envelope at the position where the girl's hands are.
 *
 * Accessibility:
 *  - Envelope is a real <button>, keyboard focusable, Enter/Space works.
 *  - Reduced motion preference is honored for ambient animations.
 */

import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NightMeadow } from "@/components/scene/NightMeadow";
import { Fireflies } from "@/components/scene/Fireflies";
import { Envelope } from "@/components/scene/Envelope";
import { OpenLetter } from "@/components/letter/OpenLetter";
import { LetterControls } from "@/components/letter/LetterControls";
import { primaryHint, secondaryHint } from "@/data/letter";

type SceneState = "idle" | "opening" | "letter";

export default function Home() {
  const [state, setState] = useState<SceneState>("idle");

  // Allow scrolling the long letter when it's open.
  useEffect(() => {
    if (state === "letter") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "auto";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [state]);

  const handleOpen = useCallback(() => {
    if (state !== "idle") return;
    setState("opening");
    // After the envelope-open animation completes, switch to the letter view.
    window.setTimeout(() => setState("letter"), 1500);
  }, [state]);

  const handleClose = useCallback(() => {
    setState("idle");
  }, []);

  const isLetterOpen = state === "letter";
  const isOpening = state === "opening";

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Layer 1 — the nighttime meadow scene (always visible) */}
      <NightMeadow dimmed={isLetterOpen} blurred={isLetterOpen} />

      {/* Layer 2 — fireflies drifting through */}
      <Fireflies />

      {/* Layer 3 — the envelope, only interactive while idle / opening */}
      <AnimatePresence>
        {state === "idle" && (
          <Envelope onOpen={handleOpen} isOpening={false} />
        )}
        {state === "opening" && (
          <Envelope onOpen={handleOpen} isOpening={true} />
        )}
      </AnimatePresence>

      {/* Layer 4 — the hint overlay (idle only) */}
      <AnimatePresence>
        {state === "idle" && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 px-4 text-center sm:bottom-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p
              className="font-persian-heading anim-hint text-lg sm:text-2xl"
              style={{
                color: "#F1E7D5",
                textShadow:
                  "0 2px 8px rgba(5,10,15,0.95), 0 0 16px rgba(5,10,15,0.8)",
              }}
              dir="rtl"
            >
              {primaryHint}
            </p>
            <p
              className="font-persian text-sm sm:text-base"
              style={{
                color: "#F1E7D5",
                opacity: 0.85,
                textShadow:
                  "0 2px 6px rgba(5,10,15,0.95), 0 0 12px rgba(5,10,15,0.8)",
              }}
              dir="rtl"
            >
              {secondaryHint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 5 — the open letter (foreground, paper + envelope flaps +
          wax seal + botanical decorations, NO stickers) */}
      <AnimatePresence>
        {isLetterOpen && (
          <>
            <OpenLetter />
            <LetterControls onClose={handleClose} />
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
