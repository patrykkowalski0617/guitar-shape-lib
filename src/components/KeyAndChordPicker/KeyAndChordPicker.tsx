import { KeyAndChordPickerRow } from "./KeyAndChordPickerRow/KeyAndChordPickerRow";
import { useControlsStore, useMusicStore } from "@/store";
import {
  BASE_CHORDS,
  UNIFIED_MUSIC_KEYS,
  type BaseChordDataKey,
  type UnifiedMusicKeysDataKeys,
} from "@/data";
import { getNotes } from "@/utils";

export function KeyAndChordPicker() {
  const setBaseChordDataKey = useControlsStore(
    (state) => state.setBaseChordDataKey,
  );
  const setUnifiedMusicKeysDataKeys = useControlsStore(
    (state) => state.setUnifiedMusicKeysDataKeys,
  );
  const setShapeVariantDataKeys = useMusicStore(
    (state) => state.setShapeVariantDataKeys,
  );
  const setShapeVariantDataKeys_locked = useMusicStore(
    (state) => state.setShapeVariantDataKeys_locked,
  );

  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const currentKeyId = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const keyEntries = Object.entries(UNIFIED_MUSIC_KEYS) as [
    UnifiedMusicKeysDataKeys,
    (typeof UNIFIED_MUSIC_KEYS)[UnifiedMusicKeysDataKeys],
  ][];

  const optionsPerKey = keyEntries.map(([keyId, keyData]) => {
    const notes = getNotes({ firstNote: keyData.majorName });
    const isFlatTune = keyData.isFlatTune;

    const chords = Object.entries(BASE_CHORDS).map(([chordId, chordData]) => {
      const noteAtOffset = notes[chordData.semitoneOffsetFromMajorTonicRoot];
      const chordName = isFlatTune
        ? noteAtOffset.flatNoteName
        : noteAtOffset.sharpNoteName;

      return {
        id: chordId,
        combinedId: `${keyId}:${chordId}`,
        chordName,
      };
    });

    return {
      keyId,
      label: `${keyData.majorName}/${keyData.relativeMinorName}`,
      chords,
    };
  });

  const currentCombinedValue = baseChordDataKey
    ? `${currentKeyId}:${baseChordDataKey}`
    : "";

  const selectKey = (keyId: UnifiedMusicKeysDataKeys) => {
    setUnifiedMusicKeysDataKeys(keyId);
    setShapeVariantDataKeys(null);
    setShapeVariantDataKeys_locked(null);
  };

  const selectChord = (combinedValue: string) => {
    if (!combinedValue) return;
    const [newKeyId, newChordId] = combinedValue.split(":");

    setBaseChordDataKey(newChordId as BaseChordDataKey);
    setUnifiedMusicKeysDataKeys(newKeyId as UnifiedMusicKeysDataKeys);
  };

  return (
    <div className="flex flex-col">
      {baseChordDataKey}
      {currentKeyId}
      {optionsPerKey.map((group) => (
        <KeyAndChordPickerRow
          key={group.keyId}
          group={group}
          isCurrentKey={currentKeyId === group.keyId}
          currentValue={currentCombinedValue}
          onSelectKey={() => selectKey(group.keyId)}
          onSelectChord={selectChord}
        />
      ))}
    </div>
  );
}
