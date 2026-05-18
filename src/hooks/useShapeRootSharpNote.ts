import { useControllersStore } from "@/store";
import { getNotes } from "@/utils";

export function useShapeRootSharpNote() {
  const unifiedMusicKeysDataKey = useControllersStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const semitoneOffsetFromMajorRoot = useControllersStore(
    (state) => state.semitoneOffsetFromMajorRoot,
  );

  if (semitoneOffsetFromMajorRoot === null) return null;

  const currentKeyNotes = getNotes({ firstNote: unifiedMusicKeysDataKey }).map(
    ({ sharpNoteName }) => sharpNoteName,
  );

  return currentKeyNotes[semitoneOffsetFromMajorRoot % 12];
}
