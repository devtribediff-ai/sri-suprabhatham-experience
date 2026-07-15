import { create } from "zustand";

/**
 * Ambient audio host — a small state machine controlling a single hidden
 * <audio> element created on first mount. Autoplay is deferred until the
 * first user gesture (browser policy) and persisted per session.
 */

type AudioState = {
  enabled: boolean;
  ready: boolean;
  muted: boolean;
  volume: number;
  setEnabled: (v: boolean) => void;
  setReady: (v: boolean) => void;
  toggleMuted: () => void;
  setMuted: (v: boolean) => void;
  setVolume: (v: number) => void;
};

const STORAGE_KEY = "ssb.audio.muted";

export const useAudio = create<AudioState>((set) => ({
  enabled: false,
  ready: false,
  muted: true,
  volume: 0.35,
  setEnabled: (v) => set({ enabled: v }),
  setReady: (v) => set({ ready: v }),
  toggleMuted: () =>
    set((s) => {
      const next = !s.muted;
      try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* ignore */ }
      return { muted: next };
    }),
  setMuted: (v) => set({ muted: v }),
  setVolume: (v) => set({ volume: v }),
}));

/** Reads persisted mute preference on the client. */
export function readMutedPreference(): boolean {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === null) return false; // default: unmuted after gesture
    return v === "true";
  } catch {
    return false;
  }
}
