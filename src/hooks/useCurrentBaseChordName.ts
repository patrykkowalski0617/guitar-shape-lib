import { BASE_CHORDS_MAP, UNIFIED_MUSIC_KEYS } from "@/data";
import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";
import { useEnharmonicNoteName } from "./useEnharmonicNoteName";

export const useCurrentBaseChordName = () => {
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const currentBaseChordData =
    BASE_CHORDS_MAP[baseChordId as keyof typeof BASE_CHORDS_MAP];

  if (!currentBaseChordData) return "";

  const mode = currentBaseChordData.isMajorMode ? "" : "m";

  const tuneKeyOffset = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;
  const chordOffset = currentBaseChordData.semitoneOffsetFromMajorScaleRoot;
  const totalOffset = tuneKeyOffset + chordOffset;

  const notes = getNotes({ length: 24 });

  const noteName = getEnharmonicNoteName(notes[totalOffset]);

  return noteName + mode;
};
