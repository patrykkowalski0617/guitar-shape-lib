import { useControlsStore } from "@/store/useControlsStore";
import { getNotes, majorScale, UNIFIED_MUSIC_KEYS } from "@/utils";

export const useTuneSharpNoteNames = () => {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const firstNote = UNIFIED_MUSIC_KEYS[currentKeyId].majorFirstNote;
  const allSharpNotesNames = getNotes({ firstNote }).map(({ sharpNoteName }) => sharpNoteName);
  return allSharpNotesNames.filter((_, i) => majorScale.includes(i));
};
