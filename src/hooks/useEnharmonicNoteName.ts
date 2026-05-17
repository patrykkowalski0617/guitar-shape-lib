import { useDataKeyStore } from "@/store";
import type { NoteObject } from "../utils/getNotes";
import { UNIFIED_MUSIC_KEYS, type UnifiedMusicKeysDataKey } from "@/data";

export const useEnharmonicNoteName = () => {
  const store_unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  return (
    noteObject: NoteObject,
    {
      unifiedMusicKeysDataKey: provided_unifiedMusicKeysDataKey,
    }: { unifiedMusicKeysDataKey?: UnifiedMusicKeysDataKey } = {},
  ) => {
    const unifiedMusicKeysDataKey =
      provided_unifiedMusicKeysDataKey ?? store_unifiedMusicKeysDataKey;

    if (!unifiedMusicKeysDataKey) return null;

    const isFlatTune = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].isFlatTune;

    const noteName = isFlatTune
      ? noteObject.flatNoteName
      : noteObject.sharpNoteName;

    return noteName;
  };
};
