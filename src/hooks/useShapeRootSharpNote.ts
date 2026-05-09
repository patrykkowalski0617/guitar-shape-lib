import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";

export function useShapeRootSharpNote() {
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const semitoneOffsetFromMajorTonicRoot = useControlsStore(
    (state) => state.semitoneOffsetFromMajorTonicRoot,
  );

  if (semitoneOffsetFromMajorTonicRoot === null) return null;

  const currentKeyNotes = getNotes({ firstNote: unifiedMusicKeysDataKey }).map(
    ({ sharpNoteName }) => sharpNoteName,
  );

  return currentKeyNotes[semitoneOffsetFromMajorTonicRoot % 12];
}
