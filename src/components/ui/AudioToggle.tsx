import { useEffect, useRef } from "react";
import { useAudio, readMutedPreference } from "@/lib/audio";
import { cn } from "@/lib/utils";

/**
 * Discreet brass audio toggle. The parent (root shell) mounts a single
 * <audio> element that this button controls. Audio autoplays softly after
 * the first user gesture — never before, per browser policy.
 */
export function AudioToggle({ className }: { className?: string }) {
  const { enabled, muted, toggleMuted, setMuted, setEnabled } = useAudio();
  const gestured = useRef(false);

  useEffect(() => {
    setMuted(readMutedPreference());
    // On first user gesture, permit playback.
    const unlock = () => {
      if (gestured.current) return;
      gestured.current = true;
      setEnabled(true);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [setEnabled, setMuted]);

  const active = enabled && !muted;

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-label={muted ? "Enable ambient sound" : "Mute ambient sound"}
      aria-pressed={active}
      className={cn(
        "group relative grid h-10 w-10 place-items-center border border-obsidian/20 text-obsidian transition-all duration-500 hover:border-brass hover:text-brass",
        className,
      )}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        {active ? (
          <>
            <path d="M16 8c1.5 1.2 1.5 6.8 0 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M19 5c3 2.5 3 11.5 0 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </>
        ) : (
          <path d="M16 8l6 8M22 8l-6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        )}
      </svg>
      {active && (
        <span
          className="pointer-events-none absolute inset-0 animate-[slow-pulse_4.5s_ease-in-out_infinite]"
          style={{ boxShadow: "inset 0 0 12px oklch(0.72 0.11 78 / 0.6)" }}
          aria-hidden
        />
      )}
    </button>
  );
}
