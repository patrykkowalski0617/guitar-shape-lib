import type {
  BaseChordDataKey,
  GuitarShapeDataKey,
  ShapeVariantDataKeys,
  UnifiedMusicKeysDataKey,
} from "@/data";

export interface DataKeyValues {
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

export interface DataKeyActions {
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

export type DataKeyState = DataKeyValues & DataKeyActions;
