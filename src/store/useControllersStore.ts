import { create } from "zustand";
import {
  STRINGS_CONFIG,
  type StringIndexes,
} from "@/components/GuitarFretboard/constants";

interface ControllersState {
  isPianoOn: boolean;
  togglePianoOn: () => void;

  visibleStrings: StringIndexes;
  setVisibleStrings: (strings: StringIndexes) => void;

  playback: boolean;
  togglePlayBackingtrack: () => void;

  lookAheadBeatsAmount: number;
  setLookAheadBeatsAmount: (lookAheadBeatsAmount: number) => void;
}

const initialState = {
  isPianoOn: false,
  visibleStrings: Array.from(STRINGS_CONFIG.keys()) as StringIndexes,
  playback: true,
  lookAheadBeatsAmount: 0,
};

export const useControllersStore = create<ControllersState>((set) => ({
  ...initialState,

  togglePianoOn: () => set((state) => ({ isPianoOn: !state.isPianoOn })),

  resetControllers: () => set(initialState),

  setVisibleStrings: (visibleStrings) => set({ visibleStrings }),

  togglePlayBackingtrack: () => set((state) => ({ playback: !state.playback })),

  setLookAheadBeatsAmount: (lookAheadBeatsAmount) =>
    set({ lookAheadBeatsAmount }),
}));
