import { UNIFIED_MUSIC_KEYS } from "@/data";
import { useEnharmonicNoteName } from "@/hooks";
import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";

export const useRoleChordsNames = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const firstNote = UNIFIED_MUSIC_KEYS[tuneKeyId].majorName;
  const notes = getNotes({ firstNote });
  const getEnharmonicNoteName = useEnharmonicNoteName();

  const getChordType = (index: number) => {
    const minorChordsIndexes = [2, 9];
    const minorDominantIndex = 4;

    return index === minorDominantIndex
      ? "?m"
      : minorChordsIndexes.includes(index)
        ? "m"
        : "";
  };

  return (index: number) =>
    notes[index] &&
    `${getEnharmonicNoteName(notes[index])}${getChordType(index)}`;
};
