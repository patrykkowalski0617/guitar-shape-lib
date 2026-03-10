import { UNIFIED_MUSIC_KEYS } from "@/data";
import { useEnharmonicNoteName } from "@/hooks";
import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";

export const useRoleChordsNames = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const firstNote = UNIFIED_MUSIC_KEYS[tuneKeyId].majorName;
  const notes = getNotes({ firstNote });
  const getEnharmonicNoteName = useEnharmonicNoteName();

  const minorChordsIndexes = [2, 9];

  return (index: number) =>
    notes[index] &&
    `${getEnharmonicNoteName(notes[index])}${minorChordsIndexes.includes(index) ? "m" : ""}`;
};
