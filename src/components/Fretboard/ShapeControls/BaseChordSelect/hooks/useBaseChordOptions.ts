import { BASE_CHORDS_MAP, UNIFIED_MUSIC_KEYS } from "@/data";
import { useEnharmonicNoteName } from "@/hooks";
import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";

export const useBaseChordOptions = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const firstNote = UNIFIED_MUSIC_KEYS[tuneKeyId].majorName;
  const notes = getNotes({ firstNote });
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const options = BASE_CHORDS_MAP.map((item) => {
    const value = item.id;
    const key = item.id;

    const noteAtOffset = notes[item.semitoneOffsetFromC];
    const isMajorMode = item.isMajorMode;
    const noteName = getEnharmonicNoteName(noteAtOffset);

    const chordName = `${noteName}${isMajorMode ? "" : "m"}`;

    return { key, value, chordName };
  });

  return options;
};
