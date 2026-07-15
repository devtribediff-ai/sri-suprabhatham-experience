import { useEffect, useRef } from "react";
import { useAudio } from "@/lib/audio";

/**
 * Hidden ambient audio element mounted once at the root shell. The audio
 * host observes the shared store and reacts to gestures + mute toggles.
 * The source is intentionally an empty string — replace with a real
 * ambient loop URL (32–96kbps mono) to activate playback. Silence when
 * empty keeps a11y and autoplay policies pristine.
 *
 * When you have an audio file, set the AUDIO_SRC constant below.
 */
const AUDIO_SRC = "" as const; // e.g. "/audio/ambient-lobby.mp3"

export function AudioHost() {
  const ref = useRef<HTMLAudioElement>(null);
  const { enabled, muted, volume } = useAudio();

  useEffect(() => {
    const el = ref.current;
    if (!el || !AUDIO_SRC) return;
    el.volume = volume;
    if (enabled && !muted) {
      el.play().catch(() => {
        // Autoplay refused — user needs to interact again.
      });
    } else {
      el.pause();
    }
  }, [enabled, muted, volume]);

  if (!AUDIO_SRC) return null;
  return (
    <audio
      ref={ref}
      src={AUDIO_SRC}
      loop
      preload="none"
      aria-hidden
      className="pointer-events-none absolute h-0 w-0 opacity-0"
    />
  );
}
