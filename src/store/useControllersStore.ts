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
}

const initialState = {
  isPianoOn: false,
  visibleStrings: Array.from(STRINGS_CONFIG.keys()) as StringIndexes,
  playback: true,
};

export const useControllersStore = create<ControllersState>((set) => ({
  ...initialState,

  togglePianoOn: () => set((state) => ({ isPianoOn: !state.isPianoOn })),

  resetControllers: () => set(initialState),

  setVisibleStrings: (strings) => set({ visibleStrings: strings }),

  togglePlayBackingtrack: () => set((state) => ({ playback: !state.playback })),
}));
