import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";

export function useShapeRootSharpNote() {
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const semitoneOffsetFromMajorRoot = useControlsStore(
    (state) => state.semitoneOffsetFromMajorRoot,
  );

  if (semitoneOffsetFromMajorRoot === null) return null;

  const currentKeyNotes = getNotes({ firstNote: unifiedMusicKeysDataKey }).map(
    ({ sharpNoteName }) => sharpNoteName,
  );

  return currentKeyNotes[semitoneOffsetFromMajorRoot % 12];
}
