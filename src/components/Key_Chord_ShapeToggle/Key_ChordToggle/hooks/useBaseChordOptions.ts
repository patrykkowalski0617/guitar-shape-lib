import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type UnifiedMusicKeysDataKeys,
} from "@/data";
import { getNotes } from "@/utils";

export const useBaseChordOptions = () => {
  const keyEntries = Object.entries(UNIFIED_MUSIC_KEYS) as [
    UnifiedMusicKeysDataKeys,
    (typeof UNIFIED_MUSIC_KEYS)[UnifiedMusicKeysDataKeys],
  ][];

  const optionsPerKey = keyEntries.map(([unifiedMusicKeysDataKey, keyData]) => {
    const firstNote = keyData.majorName;
    const notes = getNotes({ firstNote });
    const isFlatTune = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].isFlatTune;
    const chords = Object.entries(BASE_CHORDS).map(([chordId, chordData]) => {
      const noteAtOffset = notes[chordData.semitoneOffsetFromMajorTonicRoot];

      const noteName = isFlatTune
        ? noteAtOffset.flatNoteName
        : noteAtOffset.sharpNoteName;
      const chordName = `${noteName}`;

      return {
        id: chordId,
        combinedId: `${unifiedMusicKeysDataKey}:${chordId}`,
        chordName,
      };
    });

    return {
      unifiedMusicKeysDataKey,
      label: `${keyData.majorName}/${keyData.relativeMinorName}`,
      chords,
    };
  });

  return optionsPerKey;
};
