import { useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";

export function useCurrentShapeRootNote() {
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const semitoneOffsetFromMajorRoot = useControlsStore(
    (state) => state.semitoneOffsetFromMajorRoot,
  );

  if (semitoneOffsetFromMajorRoot === null) return null;

  const isFlatTune = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].isFlatTune;

  const currentKeyNotes = getNotes({ firstNote: unifiedMusicKeysDataKey }).map(
    ({ sharpNoteName, flatNoteName }) =>
      isFlatTune ? flatNoteName : sharpNoteName,
  );

  return currentKeyNotes[semitoneOffsetFromMajorRoot % 12];
}
