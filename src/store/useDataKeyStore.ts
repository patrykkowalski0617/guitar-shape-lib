import { create } from "zustand";
import type {
  BaseChordDataKey,
  ShapeDataKey,
  UnifiedMusicKeysDataKey,
} from "@/data";

interface DataKeyState {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey | null;
  baseChordDataKey: BaseChordDataKey | null;
  shapeDataKey: ShapeDataKey | null;
  semitoneOffsetFromMajorRoot: number | null;
  setUnifiedMusicKeysDataKey: (id: UnifiedMusicKeysDataKey | null) => void;
  setBaseChordDataKey: (id: BaseChordDataKey | null) => void;
  setShapeDataKey: (id: ShapeDataKey | null) => void;
  setSemitoneOffsetFromMajorRoot: (semitoneOffsetFromMajorRoot: number) => void;
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

  setSemitoneOffsetFromMajorRoot: (semitoneOffsetFromMajorRoot) =>
    set({ semitoneOffsetFromMajorRoot }),
}));
