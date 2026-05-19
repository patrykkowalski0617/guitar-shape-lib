import { create } from "zustand";
import type {
  BaseChordDataKey,
  GuitarShapeDataKey,
  ShapeVariantDataKeys,
  UnifiedMusicKeysDataKey,
} from "@/data";

interface DataKeyValues {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey | null;
  baseChordDataKey: BaseChordDataKey | null;
  guitarShapeDataKey: GuitarShapeDataKey | null;
  semitoneOffsetFromMajorRoot: number | null;
  selectedShapesVariantDataKeys: ShapeVariantDataKeys[] | null;

  nextUnifiedMusicKeysDataKey: UnifiedMusicKeysDataKey | null;
  nextBaseChordDataKey: BaseChordDataKey | null;
  nextSemitoneOffsetFromMajorRoot: number | null;
  nextSelectedShapesVariantDataKeys: ShapeVariantDataKeys[] | null;
}

interface DataKeyActions {
  setUnifiedMusicKeysDataKey: (id: UnifiedMusicKeysDataKey | null) => void;
  setBaseChordDataKey: (id: BaseChordDataKey | null) => void;
  setShapeDataKey: (id: GuitarShapeDataKey | null) => void;
  setSemitoneOffsetFromMajorRoot: (
    semitoneOffsetFromMajorRoot: number | null,
  ) => void;
  setSelectedShapesVariantDataKeys: (
    selectedShapesVariantDataKeys: ShapeVariantDataKeys[] | null,
  ) => void;

  setNextUnifiedMusicKeysDataKey: (id: UnifiedMusicKeysDataKey | null) => void;
  setNextBaseChordDataKey: (id: BaseChordDataKey | null) => void;
  setNextSemitoneOffsetFromMajorRoot: (
    semitoneOffsetFromMajorRoot: number | null,
  ) => void;
  setNextSelectedShapesVariantDataKeys: (
    selectedShapesVariantDataKeys: ShapeVariantDataKeys[] | null,
  ) => void;

  resetDataKeys: () => void;
}

type DataKeyState = DataKeyValues & DataKeyActions;

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
}));
