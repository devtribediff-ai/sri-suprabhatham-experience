import { create } from "zustand";

/**
 * Shared narrative state — which "Act" the visitor is currently in.
 * The nav and audio host both listen so cross-fades feel unified.
 */
type Act = "arrival" | "lobby" | "city" | "residence" | "lounge";

type NarrativeState = {
  act: Act;
  setAct: (a: Act) => void;
  arrivalCompleted: boolean;
  markArrivalCompleted: () => void;
};

const AK = "ssb.arrival.completed";

export const useNarrative = create<NarrativeState>((set) => ({
  act: "arrival",
  setAct: (a) => set({ act: a }),
  arrivalCompleted: false,
  markArrivalCompleted: () => {
    try { sessionStorage.setItem(AK, "1"); } catch { /* ignore */ }
    set({ arrivalCompleted: true });
  },
}));

export function readArrivalCompleted(): boolean {
  try { return sessionStorage.getItem(AK) === "1"; } catch { return false; }
}
