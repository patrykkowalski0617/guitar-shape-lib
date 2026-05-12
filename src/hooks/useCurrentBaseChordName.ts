import { BASE_CHORDS, UNIFIED_MUSIC_KEYS } from "@/data";
import { useDataKeyStore } from "@/store";
import { getNotes } from "@/utils";
import { useEnharmonicNoteName } from "./useEnharmonicNoteName";

export const useCurrentBaseChordName = () => {
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const currentBaseChordData =
    BASE_CHORDS[baseChordDataKey as keyof typeof BASE_CHORDS];

  if (!unifiedMusicKeysDataKey) return "";

  const musicKeyOffset =
    UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].offsetFromC;
  const chordOffset = currentBaseChordData.semitoneOffsetFromMajorRoot;
  const totalOffset = musicKeyOffset + chordOffset;

  const notes = getNotes({ length: 24 });

  const noteName = getEnharmonicNoteName(notes[totalOffset]);

  return noteName + currentBaseChordData.modeExtendedName;
};
