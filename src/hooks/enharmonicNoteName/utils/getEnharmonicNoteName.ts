import {
  UNIFIED_MUSIC_KEYS,
  type NoteName,
  type UnifiedMusicKeysDataKey,
} from "@/data";
import type { NoteObject } from "@/utils";

export const getEnharmonicNoteName = (
  noteObject: NoteObject,
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey,
): NoteName => {
  const isFlatTune = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].isFlatTune;
  return isFlatTune ? noteObject.flatNoteName : noteObject.sharpNoteName;
};
