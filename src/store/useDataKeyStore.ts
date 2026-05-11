import { create } from "zustand";
import type { BaseChordDataKey, UnifiedMusicKeysDataKeys } from "@/data";

interface DataKeyState {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKeys | null;
  baseChordDataKey: BaseChordDataKey | null;
  setUnifiedMusicKeysDataKeys: (id: UnifiedMusicKeysDataKeys | null) => void;
  setBaseChordDataKey: (id: BaseChordDataKey | null) => void;
}

export const useDataKeyStore = create<DataKeyState>((set) => ({
  unifiedMusicKeysDataKey: null,
  baseChordDataKey: null,

  setUnifiedMusicKeysDataKeys: (unifiedMusicKeysDataKey) =>
    set({ unifiedMusicKeysDataKey }),

  setBaseChordDataKey: (baseChordDataKey) => set({ baseChordDataKey }),
}));
