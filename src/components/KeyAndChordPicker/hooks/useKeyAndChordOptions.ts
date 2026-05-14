import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type BaseChordDataKey,
  type UnifiedMusicKeysDataKey,
  type UnifiedMusicKeysDataKeyRecord,
} from "@/data";
import { useBaseChord } from "@/hooks/useBaseChord";

export function useKeyAndChordOptions() {
  const { getBaseChordName } = useBaseChord();

  const keyEntries = Object.entries(UNIFIED_MUSIC_KEYS) as [
    UnifiedMusicKeysDataKey,
    UnifiedMusicKeysDataKeyRecord,
  ][];

  const optionsPerKey = keyEntries.map(([currentUnifiedKey, keyData]) => {
    const chords = (Object.keys(BASE_CHORDS) as BaseChordDataKey[]).map(
      (baseChordKey) => {
        const chordName = getBaseChordName({
          baseChordDataKey: baseChordKey,
          unifiedMusicKeysDataKey: currentUnifiedKey,
          isExtendedName: false,
        });

        return {
          baseChordDataKey: baseChordKey,
          combinedId: `${currentUnifiedKey}|${baseChordKey}`,
          chordName,
        };
      },
    );

    return {
      unifiedMusicKeyDataKey: currentUnifiedKey,
      label: `${keyData.majorName}/${keyData.relativeMinorName}`,
      chords,
    };
  });

  return { optionsPerKey };
}
