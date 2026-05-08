import { create } from "zustand";
import type { BaseChordId, TuneKeyId } from "@/data";
import {
  STRINGS_CONFIG,
  type StringIndex,
} from "@/components/Fretboard/constants";

interface ControlsState {
  tuneKeyId: TuneKeyId;
  setTuneKeyId: (id: TuneKeyId) => void;

  baseChordId: BaseChordId | null;
  setBaseChordId: (id: BaseChordId | null) => void;

  shapeId: string | null;
  shapeSemitoneOffsetFromC: number | null;
  setShape: (
    shapeId: string | null,
    shapeSemitoneOffsetFromC: number | null,
  ) => void;

  resetControls: () => void;

  isShapeSelectOpen: boolean;
  setIsShapeSelectOpen: (open: boolean) => void;

  isShapeSliderHold: boolean;
  setIsShapeSliderHold: (hold: boolean) => void;

  isPianoOn: boolean;
  togglePianoOn: () => void;

  visibleStrings: StringIndex[];
  setVisibleStrings: (strings: StringIndex[]) => void;

  playBackingtrack: boolean;
  togglePlayBackingtrack: () => void;
}

const initialState = {
  tuneKeyId: "C" as TuneKeyId,
  baseChordId: null,
  shapeId: null,
  shapeSemitoneOffsetFromC: null as number | null,
  isShapeSelectOpen: false,
  isShapeSliderHold: false,
  isPianoOn: false,
  visibleStrings: Array.from(STRINGS_CONFIG.keys()) as StringIndex[],
  playBackingtrack: true,
};

export const useControlsStore = create<ControlsState>((set) => ({
  ...initialState,

  setTuneKeyId: (tuneKeyId) => set({ tuneKeyId }),

  setBaseChordId: (baseChordId) => set({ baseChordId }),

  setShape: (shapeId, shapeSemitoneOffsetFromC) =>
    set({
      shapeId,
      shapeSemitoneOffsetFromC,
    }),

  setIsShapeSelectOpen: (isShapeSelectOpen) => set({ isShapeSelectOpen }),

  setIsShapeSliderHold: (isShapeSliderHold) => set({ isShapeSliderHold }),

  togglePianoOn: () => set((state) => ({ isPianoOn: !state.isPianoOn })),

  resetControls: () => set(initialState),

  setVisibleStrings: (strings) => set({ visibleStrings: strings }),

  togglePlayBackingtrack: () =>
    set((state) => ({ playBackingtrack: !state.playBackingtrack })),
}));
