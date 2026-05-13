import { create } from "zustand";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  ShapeVariantDataKeys,
  UnifiedMusicKeysDataKey,
} from "@/data";

interface DataKeyState {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey | null;
  baseChordDataKey: BaseChordDataKey | null;
  shapeDataKey: ShapeDataKey | null;
  semitoneOffsetFromMajorRoot: number | null;
  selectedShapesVariantDataKeys: ShapeVariantDataKeys[] | null;
  setUnifiedMusicKeysDataKey: (id: UnifiedMusicKeysDataKey | null) => void;
  setBaseChordDataKey: (id: BaseChordDataKey | null) => void;
  setShapeDataKey: (id: ShapeDataKey | null) => void;
  setSemitoneOffsetFromMajorRoot: (semitoneOffsetFromMajorRoot: number) => void;
  setSelectedShapeVariantDataKeys: (
    selectedShapesVariantDataKeys: ShapeVariantDataKeys[],
  ) => void;
}

export const useDataKeyStore = create<DataKeyState>((set) => ({
  unifiedMusicKeysDataKey: null,
  baseChordDataKey: null,
  shapeDataKey: null,
  semitoneOffsetFromMajorRoot: null,
  selectedShapesVariantDataKeys: null,

  setUnifiedMusicKeysDataKey: (unifiedMusicKeysDataKey) =>
    set({ unifiedMusicKeysDataKey }),

  setBaseChordDataKey: (baseChordDataKey) => set({ baseChordDataKey }),

  setShapeDataKey: (shapeDataKey) => set({ shapeDataKey }),

  setSemitoneOffsetFromMajorRoot: (semitoneOffsetFromMajorRoot) =>
    set({ semitoneOffsetFromMajorRoot }),

  setSelectedShapeVariantDataKeys: (selectedShapesVariantDataKeys) =>
    set({ selectedShapesVariantDataKeys }),
}));
