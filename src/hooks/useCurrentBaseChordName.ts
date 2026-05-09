import { BASE_CHORDS, UNIFIED_MUSIC_KEYS } from "@/data";
import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";
import { useEnharmonicNoteName } from "./useEnharmonicNoteName";

export const useCurrentBaseChordName = () => {
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const currentBaseChordData =
    BASE_CHORDS[baseChordDataKey as keyof typeof BASE_CHORDS];

  if (!currentBaseChordData) return "";

  const tuneKeyOffset = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].offsetFromC;
  const chordOffset = currentBaseChordData.semitoneOffsetFromMajorTonicRoot;
  const totalOffset = tuneKeyOffset + chordOffset;

  const notes = getNotes({ length: 24 });

  const noteName = getEnharmonicNoteName(notes[totalOffset]);

  return noteName + currentBaseChordData.modeExtendedName;
};
