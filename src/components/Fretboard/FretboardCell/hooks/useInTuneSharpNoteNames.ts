import { useControlsStore } from "@/store";
import { majorScale, UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";

export const useInTuneSharpNoteNames = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const firstNote = UNIFIED_MUSIC_KEYS[tuneKeyId].majorFirstNote;
  const allSharpNoteNames = getNotes({ firstNote }).map(({ sharpNoteName }) => sharpNoteName);
  const majorScaleSharpNoteNames = allSharpNoteNames.filter((_, i) => majorScale.includes(i));

  return majorScaleSharpNoteNames;
};
