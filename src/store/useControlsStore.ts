import { create } from "zustand";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  UnifiedMusicKeysDataKeys,
} from "@/data";
import {
  STRINGS_CONFIG,
  type StringIndex,
} from "@/components/Fretboard/constants";

interface ControlsState {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKeys;
  setUnifiedMusicKeysDataKeys: (id: UnifiedMusicKeysDataKeys) => void;

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

  visibleStrings: StringIndex[];
  setVisibleStrings: (strings: StringIndex[]) => void;

  playBackingtrack: boolean;
  togglePlayBackingtrack: () => void;
}

const initialState = {
  unifiedMusicKeysDataKey: "C" as UnifiedMusicKeysDataKeys,
  baseChordDataKey: "BaseChord1" as BaseChordDataKey,
  shapeDataKey: null,
  semitoneOffsetFromMajorRoot: null as number | null,
  isShapeSelectOpen: false,
  isShapeSliderHold: false,
  isPianoOn: false,
  visibleStrings: Array.from(STRINGS_CONFIG.keys()) as StringIndex[],
  playBackingtrack: true,
};

export const useControlsStore = create<ControlsState>((set) => ({
  ...initialState,

  setUnifiedMusicKeysDataKeys: (unifiedMusicKeysDataKey) =>
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
