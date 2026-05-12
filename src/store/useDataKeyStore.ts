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
  selectedShapeVariantDataKeys: ShapeVariantDataKeys[] | null;
  setUnifiedMusicKeysDataKey: (id: UnifiedMusicKeysDataKey | null) => void;
  setBaseChordDataKey: (id: BaseChordDataKey | null) => void;
  setShapeDataKey: (id: ShapeDataKey | null) => void;
  setSemitoneOffsetFromMajorRoot: (semitoneOffsetFromMajorRoot: number) => void;
  setSelectedShapeVariantDataKeys: (
    selectedShapeVariantDataKeys: ShapeVariantDataKeys[],
  ) => void;
}

export const useDataKeyStore = create<DataKeyState>((set) => ({
  unifiedMusicKeysDataKey: null,
  baseChordDataKey: null,
  shapeDataKey: null,
  semitoneOffsetFromMajorRoot: null,
  selectedShapeVariantDataKeys: null,

  setUnifiedMusicKeysDataKey: (unifiedMusicKeysDataKey) =>
    set({ unifiedMusicKeysDataKey }),

  setBaseChordDataKey: (baseChordDataKey) => set({ baseChordDataKey }),

  setShapeDataKey: (shapeDataKey) => set({ shapeDataKey }),

  setSemitoneOffsetFromMajorRoot: (semitoneOffsetFromMajorRoot) =>
    set({ semitoneOffsetFromMajorRoot }),

  setSelectedShapeVariantDataKeys: (selectedShapeVariantDataKeys) =>
    set({ selectedShapeVariantDataKeys }),
}));
