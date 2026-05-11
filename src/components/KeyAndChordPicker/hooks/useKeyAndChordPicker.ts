import { useDataKeyStore, useUiStore } from "@/store";
import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type BaseChordDataKey,
  type UnifiedMusicKeysDataKeys,
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

  const keyEntries = Object.entries(UNIFIED_MUSIC_KEYS);

  const optionsPerKey = keyEntries.map(([unifiedMusicKeyDataKey, keyData]) => {
    const notes = getNotes({ firstNote: keyData.majorName });
    const isFlatTune = keyData.isFlatTune;

    const chords = Object.entries(BASE_CHORDS).map(
      ([baseChordDataKey, chordData]) => {
        const noteAtOffset = notes[chordData.semitoneOffsetFromMajorTonicRoot];
        const chordName = isFlatTune
          ? noteAtOffset.flatNoteName
          : noteAtOffset.sharpNoteName;

        return {
          id: baseChordDataKey,
          combinedId: `${unifiedMusicKeyDataKey}:${baseChordDataKey}`,
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

  const currentCombinedValue = baseChordDataKey
    ? `${currentTuneKeyDataKey}:${baseChordDataKey}`
    : "";

  const selectChord = (combinedValue: string) => {
    if (!combinedValue) return;
    const [newKeyId, newChordId] = combinedValue.split(":");

    setBaseChordDataKey(newChordId as BaseChordDataKey);
    setUnifiedMusicKeysDataKeys(newKeyId as UnifiedMusicKeysDataKeys);
    setExpanded(false);
  };

  return {
    isExpanded,
    optionsPerKey,
    currentTuneKeyDataKey,
    currentCombinedValue,
    selectChord,
  };
}
