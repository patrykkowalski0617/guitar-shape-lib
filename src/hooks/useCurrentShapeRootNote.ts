import { useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";

export function useCurrentShapeRootNote() {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const semitoneOffsetFromMajorTonicRoot = useControlsStore(
    (state) => state.semitoneOffsetFromMajorTonicRoot,
  );

  if (semitoneOffsetFromMajorTonicRoot === null) return null;

  const isFlatTune = UNIFIED_MUSIC_KEYS[tuneKeyId].isFlatTune;

  const currentKeyNotes = getNotes({ firstNote: tuneKeyId }).map(
    ({ sharpNoteName, flatNoteName }) =>
      isFlatTune ? flatNoteName : sharpNoteName,
  );

  return currentKeyNotes[semitoneOffsetFromMajorTonicRoot % 12];
}
