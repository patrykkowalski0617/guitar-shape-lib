import { useDataKeyStore, useUiStore } from "@/store";
import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type BaseChordDataKey,
  type UnifiedMusicKeysDataKeys,
  type UnifiedMusicKeysDataKeysRecord,
} from "@/data";
import { getNotes } from "@/utils";

export function useKeyAndChordPicker() {
  const isExpanded = useUiStore((state) => state.isKeyAndChordPickerExpanded);
  const setExpanded = useUiStore((state) => state.setKeyAndChordPickerExpanded);

  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );
  const setUnifiedMusicKeysDataKeys = useDataKeyStore(
    (state) => state.setUnifiedMusicKeysDataKeys,
  );
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const currentTuneKeyDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const buildOptions = () => {
    const keyEntries = Object.entries(UNIFIED_MUSIC_KEYS) as [
      UnifiedMusicKeysDataKeys,
      UnifiedMusicKeysDataKeysRecord,
    ][];

    return keyEntries.map(([unifiedMusicKeyDataKey, keyData]) => {
      const notesInKey = getNotes({ firstNote: keyData.majorFirstNote });
      const useFlatNames = keyData.isFlatTune;

      const chords = Object.entries(BASE_CHORDS).map(
        ([chordKey, chordData]) => {
          const note = notesInKey[chordData.semitoneOffsetFromMajorTonicRoot];
          const chordName = useFlatNames
            ? note.flatNoteName
            : note.sharpNoteName;
          const bChordKey = chordKey as BaseChordDataKey;

          return {
            baseChordDataKey: bChordKey,
            combinedId: `${unifiedMusicKeyDataKey}:${bChordKey}`,
            chordName,
          };
        },
      );

      return {
        unifiedMusicKeyDataKey,
        label: `${keyData.majorName}/${keyData.relativeMinorName}`,
        chords,
      };
    });
  };

  const optionsPerKey = buildOptions();
  const currentCombinedValue = baseChordDataKey
    ? `${currentTuneKeyDataKey}:${baseChordDataKey}`
    : "";

  const handleChordSelection = (
    newUnifiedKey: UnifiedMusicKeysDataKeys,
    newChordKey: BaseChordDataKey,
  ) => {
    setBaseChordDataKey(newChordKey);
    setUnifiedMusicKeysDataKeys(newUnifiedKey);
    setExpanded(false);
  };

  return {
    isExpanded,
    optionsPerKey,
    currentTuneKeyDataKey,
    currentCombinedValue,
    handleChordSelection,
  };
}
