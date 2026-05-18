import { useControllersStore } from "@/store";
import { SCALE_SEMITONE_TEMPLATES, UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";

export const useInTuneSharpNoteNames = () => {
  const unifiedMusicKeysDataKey = useControllersStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const firstNote = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].majorFirstNote;
  const allSharpNoteNames = getNotes({ firstNote }).map(
    ({ sharpNoteName }) => sharpNoteName,
  );
  const majorScaleSharpNoteNames = allSharpNoteNames.filter((_, i) =>
    SCALE_SEMITONE_TEMPLATES.ionianScale.includes(i),
  );

  return majorScaleSharpNoteNames;
};
