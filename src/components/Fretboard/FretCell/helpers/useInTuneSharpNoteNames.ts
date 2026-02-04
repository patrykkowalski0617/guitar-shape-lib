import { useControlsStore } from "@/store/useControlsStore";
import { getNotes, majorScale, UNIFIED_MUSIC_KEYS } from "@/utils";

export const useInTuneSharpNoteNames = () => {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const firstNote = UNIFIED_MUSIC_KEYS[currentKeyId].majorFirstNote;
  const allSharpNoteNames = getNotes({ firstNote }).map(({ sharpNoteName }) => sharpNoteName);
  const majorScaleSharpNoteNames = allSharpNoteNames.filter((_, i) => majorScale.includes(i));

  return majorScaleSharpNoteNames;
};
