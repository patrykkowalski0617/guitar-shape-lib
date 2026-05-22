import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type BaseChordDataKey,
  type UnifiedMusicKeysDataKey,
  type UnifiedMusicKeysDataKeyRecord,
  type NoteName,
} from "@/data";
import { getBaseChordName } from "@/hooks/baseChord";

export function getKeyAndChordOptions() {
  const keyEntries = Object.entries(UNIFIED_MUSIC_KEYS) as [
    UnifiedMusicKeysDataKey,
    UnifiedMusicKeysDataKeyRecord,
  ][];

  const optionsPerKey = keyEntries.map(([currentUnifiedKey, keyData]) => {
    const chords = (Object.keys(BASE_CHORDS) as BaseChordDataKey[]).map(
      (baseChordKey) => {
        const baseChordName = getBaseChordName({
          baseChordDataKey: baseChordKey,
          unifiedMusicKeysDataKey: currentUnifiedKey,
          isExtendedName: false,
        }) as NoteName;

        return {
          baseChordDataKey: baseChordKey,
          combinedId: `${currentUnifiedKey}|${baseChordKey}`,
          baseChordName,
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
