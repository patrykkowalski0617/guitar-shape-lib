import { BASE_CHORDS_MAP, UNIFIED_MUSIC_KEYS } from "@/data";
import { useEnharmonicNoteName } from "@/hooks";
import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";

export const useBaseChordOptions = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const firstNote = UNIFIED_MUSIC_KEYS[tuneKeyId].majorName;
  const notes = getNotes({ firstNote });
  const getEnharmonicNoteName = useEnharmonicNoteName();
  const options = Object.entries(BASE_CHORDS_MAP).map(([id, data]) => {
    const value = id;
    const key = id;

    const noteAtOffset = notes[data.semitoneOffsetFromC];
    const isMajorMode = data.isMajorMode;
    const noteName = getEnharmonicNoteName(noteAtOffset);

    const chordName = `${noteName}${isMajorMode ? "" : "m"}`;

    return { key, value, chordName };
  });

  return options;
};
