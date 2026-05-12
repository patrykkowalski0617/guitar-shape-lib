import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type BaseChordDataKey,
  type UnifiedMusicKeysDataKey,
  type UnifiedMusicKeysDataKeyRecord,
} from "@/data";
import { getNotes } from "@/utils";

export function useKeyAndChordOptions() {
  const keyEntries = Object.entries(UNIFIED_MUSIC_KEYS) as [
    UnifiedMusicKeysDataKey,
    UnifiedMusicKeysDataKeyRecord,
  ][];

  const optionsPerKey = keyEntries.map(([currentUnifiedKey, keyData]) => {
    const notesInKey = getNotes({ firstNote: keyData.majorFirstNote });
    const useFlatNames = keyData.isFlatTune;

    const chords = Object.entries(BASE_CHORDS).map(([chordKey, chordData]) => {
      const note = notesInKey[chordData.semitoneOffsetFromMajorRoot];
      const chordName = useFlatNames ? note.flatNoteName : note.sharpNoteName;
      const bChordKey = chordKey as BaseChordDataKey;

      return {
        baseChordDataKey: bChordKey,
        combinedId: `${currentUnifiedKey}|${bChordKey}`,
        chordName,
      };
    });

    return {
      unifiedMusicKeyDataKey: currentUnifiedKey,
      label: `${keyData.majorName}/${keyData.relativeMinorName}`,
      chords,
    };
  });

  return { optionsPerKey };
}
