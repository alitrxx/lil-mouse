"use client";

/**
 * OpenLetter — the inside of the open letter, mobile-first design.
 *
 * The website is primarily designed for mobile phones, so the letter
 * is optimized for a 390×844 viewport first, then scales up for
 * tablet and desktop.
 *
 * Layout strategy (mobile-first):
 *  - The image is square (1254×1254, transparent PNG).
 *  - On MOBILE, the image fills ~94% of the viewport WIDTH. Since
 *    the image is square, its height = width (~367px on 390px
 *    viewport). The writing area inside the paper is ~34% of the
 *    image height = ~125px — too small for the full Persian message
 *    at a readable font size.
 *  - Solution: allow the ENTIRE letter (image + text overlay) to be
 *    larger than the viewport on mobile. The image is displayed at
 *    a larger size (e.g., 130% of viewport width) and the outer
 *    container scrolls vertically. The user scrolls the PAGE to
 *    see the whole letter — natural mobile UX, not a tiny
 *    scroll-within-a-box.
 *  - On TABLET and DESKTOP, the image is sized to fit the viewport
 *    without scrolling (constrained by viewport height).
 *  - The PAPER SHEET occupies the upper ~60% of the image. The safe
 *    writing area (inside the paper, avoiding all decorations) is
 *    approximately: left 25%, top 20%, right 25%, bottom 46%.
 *  - Text is RTL Persian, right-aligned, top-aligned, with 14-16px
 *    body text and 1.8 line-height for comfortable Persian reading.
 *  - Text container uses box-sizing: border-box, overflow-wrap:
 *    break-word, and word-break: break-word for proper wrapping.
 *
 * Responsive breakpoints:
 *  - Mobile (up to 600px): image at 130vw (larger than viewport,
 *    page scrolls vertically), body 14-16px
 *  - Tablet (601-1024px): image at min(82vh, 82vw), body 15-18px
 *  - Desktop (above 1024px): image at min(78vh, 720px), body 16-18px
 */

import React from "react";
import { motion } from "framer-motion";
import { letter } from "@/data/letter";

export const OpenLetter: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-start justify-center overflow-y-auto overflow-x-hidden"
      style={{
        padding: "5vh 3vw 5vh 3vw",
        // Safe-area insets for mobile browser UI
        paddingTop: "max(5vh, env(safe-area-inset-top))",
        paddingBottom: "max(5vh, env(safe-area-inset-bottom))",
        paddingLeft: "max(3vw, env(safe-area-inset-left))",
        paddingRight: "max(3vw, env(safe-area-inset-right))",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="letter-container relative my-0"
        style={{
          // Mobile-first: on mobile, the image is LARGER than the
          // viewport width (135vw on a 390px viewport = 527px).
          // The outer container has overflow-x: hidden, so the
          // transparent edges of the image (which contain no letter
          // content) are clipped naturally. The paper (at 16-85% of
          // the image width) is fully visible in the center.
          //
          // This makes the writing area bigger (~186px tall instead
          // of ~125px) so the text fits at a readable 14-16px font
          // size without excessive scrolling.
          //
          // On tablet/desktop, the image is constrained by viewport
          // height to fit without page scrolling.
          //
          // The image is square, so width = height.
          width: "min(135vw, 82vh, 720px)",
          height: "min(135vw, 82vh, 720px)",
          aspectRatio: "1 / 1",
          // No maxWidth — we WANT the image to be wider than the
          // viewport on mobile. The transparent edges are clipped by
          // the parent's overflow-x: hidden.
        }}
      >
        {/* === The letter image with transparent background === */}
        <img
          src="/images/letter-background.png"
          alt="نامه دست‌ساز با تزئینات"
          className="block h-full w-full select-none"
          style={{
            objectFit: "contain",
            filter:
              "drop-shadow(0 30px 70px rgba(16,26,53,0.7)) drop-shadow(0 8px 20px rgba(16,26,53,0.55))",
          }}
          draggable={false}
        />

        {/* === Text overlay — positioned in the writing area of the
            paper. All coordinates are RELATIVE TO THE IMAGE, so they
            stay correct at any image size.
              left: 25%, top: 20%, right: 25%, bottom: 46%
            This avoids all decorations:
              - Heart at 31-34% x, 14-17% y (above text container)
              - Star at 68.3-71.3% x, 18.4-21.4% y (above text container)
              - Ribbon/bow at 72.5-79.5% x, 10-18.2% y (right of text)
              - Line art flowers at 21-30% x, 53-65.5% y (below text)
              - Blue floral cluster at 33.5-47% x, 67-80% y (below, envelope)
              - Wax seal at 45.5-57.5% x, 75-86.5% y (envelope area)
            On mobile, the text container is large enough (because the
            image is 130vw) to fit most/all of the text. If the text
            is slightly longer than the writing area, the page scrolls
            (the outer container has overflow-y: auto). */}
        <div
          className="letter-text-container absolute flex flex-col"
          style={{
            // Extended on mobile to use more of the paper area.
            // top: 17% (below the heart at y=14-17%, accepting minor
            // overlap with the small star at y=18.4-21.4%, x=68.3-71.3%
            // — the heading is centered and won't overlap with it)
            // bottom: 42% (extends to y=58%, just above the paper
            // bottom at y=60%; the line art flowers at y=53-65.5% are
            // at x=21-30%, mostly left of the text container at x=25%)
            left: "25%",
            top: "17%",
            right: "25%",
            bottom: "42%",
            justifyContent: "flex-start",
            alignItems: "stretch",
            boxSizing: "border-box",
            padding: "2px 6px",
            // Allow vertical scrolling within the writing area.
            // Paper design stays fixed; only the text scrolls.
            overflowY: "auto",
            overflowX: "hidden",
            // Smooth touch scrolling on mobile iOS
            WebkitOverflowScrolling: "touch",
            // Ensure vertical touch-scrolling works on mobile
            touchAction: "pan-y",
            // Subtle scrollbar — track is transparent, thumb is subtle.
            // On mobile, the scrollbar is typically hidden by default
            // but scrolling still works via touch.
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(42, 58, 92, 0.4) transparent",
          }}
          dir="rtl"
        >
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-center"
            style={{ marginBottom: "0.4em", flexShrink: 0, textAlign: "center" }}
          >
            <h2
              className="font-persian-heading letter-heading"
              style={{
                color: "#2C2C2C",
                fontWeight: 900,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
              dir="rtl"
            >
              {letter.heading}
            </h2>
          </motion.div>

          {/* Body paragraphs */}
          <div
            className="font-persian letter-body"
            style={{
              color: "#2C2C2C",
              textAlign: "justify",
              direction: "rtl",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              flex: 1,
            }}
          >
            {letter.paragraphs.map((p, i) => {
              const delay = 0.5 + i * 0.18;
              return (
                <motion.p
                  key={`p-${i}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay }}
                  style={{
                    marginBottom: "0.35em",
                    fontWeight: p.emphasize ? 700 : 400,
                    color: p.emphasize ? "#1A1A1A" : "#2C2C2C",
                    textAlign: p.emphasize ? "center" : "justify",
                    marginTop: p.emphasize ? "0.5em" : undefined,
                    lineHeight: p.emphasize ? 1.4 : 1.7,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {p.text}
                </motion.p>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OpenLetter;
