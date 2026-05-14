import { create } from "zustand";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  ShapeVariantDataKeys,
  UnifiedMusicKeysDataKey,
} from "@/data";

interface DataKeyValues {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey | null;
  baseChordDataKey: BaseChordDataKey | null;
  shapeDataKey: ShapeDataKey | null;
  semitoneOffsetFromMajorRoot: number | null;
  selectedShapesVariantDataKeys: ShapeVariantDataKeys[] | null;
}

interface DataKeyActions {
  setUnifiedMusicKeysDataKey: (id: UnifiedMusicKeysDataKey | null) => void;
  setBaseChordDataKey: (id: BaseChordDataKey | null) => void;
  setShapeDataKey: (id: ShapeDataKey | null) => void;
  setSemitoneOffsetFromMajorRoot: (
    semitoneOffsetFromMajorRoot: number | null,
  ) => void;
  setSelectedShapesVariantDataKeys: (
    selectedShapesVariantDataKeys: ShapeVariantDataKeys[] | null,
  ) => void;
  resetDataKeys: () => void;
}

type DataKeyState = DataKeyValues & DataKeyActions;

const initialState: DataKeyValues = {
  unifiedMusicKeysDataKey: "C",
  baseChordDataKey: null,
  shapeDataKey: null,
  semitoneOffsetFromMajorRoot: null,
  selectedShapesVariantDataKeys: null,
};

export const useDataKeyStore = create<DataKeyState>((set) => ({
  ...initialState,

  setUnifiedMusicKeysDataKey: (unifiedMusicKeysDataKey) =>
    set({ unifiedMusicKeysDataKey }),

  setBaseChordDataKey: (baseChordDataKey) => set({ baseChordDataKey }),

  setShapeDataKey: (shapeDataKey) => set({ shapeDataKey }),

  setSemitoneOffsetFromMajorRoot: (semitoneOffsetFromMajorRoot) =>
    set({ semitoneOffsetFromMajorRoot }),

  setSelectedShapesVariantDataKeys: (selectedShapesVariantDataKeys) =>
    set({ selectedShapesVariantDataKeys }),

  resetDataKeys: () => set({ ...initialState }),
}));
