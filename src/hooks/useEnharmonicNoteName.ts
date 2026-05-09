import { useControlsStore } from "@/store";
import type { NoteObject } from "../utils/getNotes";
import { UNIFIED_MUSIC_KEYS } from "@/data";

export const useEnharmonicNoteName = () => {
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const isFlatTune = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].isFlatTune;

  return (note: NoteObject) =>
    isFlatTune ? note.flatNoteName : note.sharpNoteName;
};
