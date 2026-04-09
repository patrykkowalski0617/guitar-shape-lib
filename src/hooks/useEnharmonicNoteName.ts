import { useControlsStore } from "@/store";
import type { NoteObject } from "../utils/getNotes";
import { UNIFIED_MUSIC_KEYS } from "@/data";

export const useEnharmonicNoteName = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const isFlatTune = UNIFIED_MUSIC_KEYS[tuneKeyId].isFlatTune;

  return (note: NoteObject) =>
    isFlatTune ? note.flatNoteName : note.sharpNoteName;
};
