"use client";

/**
 * LetterControls — small unobtrusive controls shown when the letter is open.
 *
 *  - Ambient sound toggle (OFF by default; only emits if a local audio file
 *    is provided at /sounds/ambient.mp3 by the user). The website works
 *    perfectly without audio; if the file is missing, the toggle is hidden.
 *  - Close button — returns to the initial envelope scene.
 *
 * Respects reduced motion: only controls continuous audio, no animations.
 */

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, X } from "lucide-react";

interface LetterControlsProps {
  onClose: () => void;
  /** Path to a local ambient audio file (e.g. "/sounds/ambient.mp3"). */
  audioSrc?: string;
}

export const LetterControls: React.FC<LetterControlsProps> = ({
  onClose,
  audioSrc = "/sounds/ambient.mp3",
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioAvailable, setAudioAvailable] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  // Check if the audio file is actually present (HEAD request).
  // State is only updated inside async callbacks to avoid cascading renders.
  useEffect(() => {
    if (!audioSrc) return; // audioAvailable defaults to false
    let cancelled = false;
    fetch(audioSrc, { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setAudioAvailable(r.ok);
      })
      .catch(() => {
        if (!cancelled) setAudioAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [audioSrc]);

  // Lazily create the audio element only when toggled on.
  useEffect(() => {
    if (audioOn && audioAvailable && !audioRef.current && audioSrc) {
      const a = new Audio(audioSrc);
      a.loop = true;
      a.volume = 0.18;
      a.play().catch(() => setAudioOn(false));
      audioRef.current = a;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioOn, audioAvailable, audioSrc]);

  const toggleAudio = () => {
    if (!audioAvailable) return;
    setAudioOn((v) => !v);
  };

  return (
    <div
      className="fixed left-4 top-4 z-40 flex items-center gap-2"
      style={{ direction: "ltr" }}
    >
      {audioAvailable && (
        <button
          type="button"
          onClick={toggleAudio}
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: "rgba(241, 231, 213, 0.10)",
            border: "1px solid rgba(241, 231, 213, 0.20)",
            color: "#F1E7D5",
          }}
          aria-label={audioOn ? "خاموش کردن صدا" : "روشن کردن صدا"}
          aria-pressed={audioOn}
          title={audioOn ? "خاموش کردن صدا" : "روشن کردن صدا"}
        >
          {audioOn ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </button>
      )}

      <button
        type="button"
        onClick={onClose}
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-full"
        style={{
          backgroundColor: "rgba(241, 231, 213, 0.10)",
          border: "1px solid rgba(241, 231, 213, 0.20)",
          color: "#F1E7D5",
        }}
        aria-label="بستن نامه"
        title="بستن نامه"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default LetterControls;
