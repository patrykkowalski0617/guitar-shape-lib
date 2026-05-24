import { create } from "zustand";
import type { DataKeyState, DataKeyValues } from "./types";

const initialState: DataKeyValues = {
  unifiedMusicKeysDataKey: "C",
  baseChordDataKey: null,
  guitarShapeDataKey: null,
  semitoneOffsetFromMajorRoot: null,
  selectedShapesVariantDataKeys: null,

  nextUnifiedMusicKeysDataKey: null,
  nextBaseChordDataKey: null,
  nextSemitoneOffsetFromMajorRoot: null,
  nextSelectedShapesVariantDataKeys: null,
};

export const useDataKeyStore = create<DataKeyState>((set) => ({
  ...initialState,

  setUnifiedMusicKeysDataKey: (unifiedMusicKeysDataKey) =>
    set({ unifiedMusicKeysDataKey }),
  setBaseChordDataKey: (baseChordDataKey) => set({ baseChordDataKey }),
  setShapeDataKey: (guitarShapeDataKey) => set({ guitarShapeDataKey }),
  setSemitoneOffsetFromMajorRoot: (semitoneOffsetFromMajorRoot) =>
    set({ semitoneOffsetFromMajorRoot }),
  setSelectedShapesVariantDataKeys: (selectedShapesVariantDataKeys) =>
    set({ selectedShapesVariantDataKeys }),

  setNextUnifiedMusicKeysDataKey: (nextUnifiedMusicKeysDataKey) =>
    set({ nextUnifiedMusicKeysDataKey }),
  setNextBaseChordDataKey: (nextBaseChordDataKey) =>
    set({ nextBaseChordDataKey }),
  setNextSemitoneOffsetFromMajorRoot: (nextSemitoneOffsetFromMajorRoot) =>
    set({ nextSemitoneOffsetFromMajorRoot }),
  setNextSelectedShapesVariantDataKeys: (nextSelectedShapesVariantDataKeys) =>
    set({ nextSelectedShapesVariantDataKeys }),

  resetDataKeys: () => set({ ...initialState }),

  restoreCurrentBrick: ({
    baseChordDataKey,
    unifiedMusicKeysDataKey,
    semitoneOffsetFromMajorRoot,
    selectedShapesVariantDataKeys,
  }) =>
    set({
      baseChordDataKey,
      unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot,
      selectedShapesVariantDataKeys,
    }),

  restoreNextBrick: ({
    nextBaseChordDataKey,
    nextUnifiedMusicKeysDataKey,
    nextSemitoneOffsetFromMajorRoot,
    nextSelectedShapesVariantDataKeys,
  }) =>
    set({
      nextBaseChordDataKey,
      nextUnifiedMusicKeysDataKey,
      nextSemitoneOffsetFromMajorRoot,
      nextSelectedShapesVariantDataKeys,
    }),
}));
