import { create } from "zustand";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  UnifiedMusicKeysDataKeys,
} from "@/data";

interface DataKeyState {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKeys | null;
  baseChordDataKey: BaseChordDataKey | null;
  shapeDataKey: ShapeDataKey | null;
  semitoneOffsetFromMajorRoot: number | null;
  setUnifiedMusicKeysDataKey: (id: UnifiedMusicKeysDataKeys | null) => void;
  setBaseChordDataKey: (id: BaseChordDataKey | null) => void;
  setShapeDataKey: (id: ShapeDataKey | null) => void;
  setShapeSemitoneOffsetFromMajorRoot: (
    semitoneOffsetFromMajorRoot: number,
  ) => void;
}

export const useDataKeyStore = create<DataKeyState>((set) => ({
  unifiedMusicKeysDataKey: null,
  baseChordDataKey: null,
  shapeDataKey: null,
  semitoneOffsetFromMajorRoot: null,

  setUnifiedMusicKeysDataKey: (unifiedMusicKeysDataKey) =>
    set({ unifiedMusicKeysDataKey }),

  setBaseChordDataKey: (baseChordDataKey) => set({ baseChordDataKey }),

  setShapeDataKey: (shapeDataKey) => set({ shapeDataKey }),

  setShapeSemitoneOffsetFromMajorRoot: (semitoneOffsetFromMajorRoot) =>
    set({ semitoneOffsetFromMajorRoot }),
}));
