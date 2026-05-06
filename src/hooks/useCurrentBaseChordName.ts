import { BASE_CHORDS, UNIFIED_MUSIC_KEYS } from "@/data";
import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";
import { useEnharmonicNoteName } from "./useEnharmonicNoteName";

export const useCurrentBaseChordName = () => {
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const currentBaseChordData =
    BASE_CHORDS[baseChordId as keyof typeof BASE_CHORDS];

  if (!currentBaseChordData) return "";

  const tuneKeyOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;
  const chordOffset = currentBaseChordData.semitoneOffsetFromMajorScaleRoot;
  const totalOffset = tuneKeyOffset + chordOffset;

  const notes = getNotes({ length: 24 });

  const noteName = getEnharmonicNoteName(notes[totalOffset]);

  return noteName + currentBaseChordData.modeExtendedName;
};
