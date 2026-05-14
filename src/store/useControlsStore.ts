import { create } from "zustand";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  UnifiedMusicKeysDataKey,
} from "@/data";
import {
  STRINGS_CONFIG,
  type StringIndexes,
} from "@/components/GuitarFretboard/constants";

interface ControlsState {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  setUnifiedMusicKeysDataKey: (id: UnifiedMusicKeysDataKey) => void;

  baseChordDataKey: BaseChordDataKey | null;
  setBaseChordDataKey: (id: BaseChordDataKey | null) => void;

  shapeDataKey: ShapeDataKey | null;
  semitoneOffsetFromMajorRoot: number | null;
  setShape: (
    shapeDataKey: ShapeDataKey | null,
    semitoneOffsetFromMajorRoot: number | null,
  ) => void;

  resetControls: () => void;

  isShapeSelectOpen: boolean;
  setIsShapeSelectOpen: (open: boolean) => void;

  isShapeSliderHold: boolean;
  setIsShapeSliderHold: (hold: boolean) => void;

  isPianoOn: boolean;
  togglePianoOn: () => void;

  visibleStrings: StringIndexes;
  setVisibleStrings: (strings: StringIndexes) => void;

  playBackingtrack: boolean;
  togglePlayBackingtrack: () => void;
}

const initialState = {
  unifiedMusicKeysDataKey: "C" as UnifiedMusicKeysDataKey,
  baseChordDataKey: "BaseChord1" as BaseChordDataKey,
  shapeDataKey: null,
  semitoneOffsetFromMajorRoot: null as number | null,
  isShapeSelectOpen: false,
  isShapeSliderHold: false,
  isPianoOn: false,
  visibleStrings: Array.from(STRINGS_CONFIG.keys()) as StringIndexes,
  playBackingtrack: true,
};

export const useControlsStore = create<ControlsState>((set) => ({
  ...initialState,

  setUnifiedMusicKeysDataKey: (unifiedMusicKeysDataKey) =>
    set({ unifiedMusicKeysDataKey }),

  setBaseChordDataKey: (baseChordDataKey) => set({ baseChordDataKey }),

  setShape: (shapeDataKey, semitoneOffsetFromMajorRoot) =>
    set({
      shapeDataKey,
      semitoneOffsetFromMajorRoot,
    }),

  setIsShapeSelectOpen: (isShapeSelectOpen) => set({ isShapeSelectOpen }),

  setIsShapeSliderHold: (isShapeSliderHold) => set({ isShapeSliderHold }),

  togglePianoOn: () => set((state) => ({ isPianoOn: !state.isPianoOn })),

  resetControls: () => set(initialState),

  setVisibleStrings: (strings) => set({ visibleStrings: strings }),

  togglePlayBackingtrack: () =>
    set((state) => ({ playBackingtrack: !state.playBackingtrack })),
}));
