import { create } from "zustand";
import {
  STRINGS_CONFIG,
  type StringIndexes,
} from "@/components/GuitarFretboard/constants";
import type { ControllersState } from "./types";

const initialState = {
  isPianoOn: false,
  visibleStrings: Array.from(STRINGS_CONFIG.keys()) as StringIndexes,
  playback: true,
};

export const useControllersStore = create<ControllersState>((set) => ({
  ...initialState,

  togglePianoOn: () => set((state) => ({ isPianoOn: !state.isPianoOn })),

  resetControllers: () => set(initialState),

  setVisibleStrings: (visibleStrings) => set({ visibleStrings }),

  togglePlayBackingtrack: () => set((state) => ({ playback: !state.playback })),
}));
