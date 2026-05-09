import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";

export function useShapeRootSharpNote() {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const semitoneOffsetFromMajorTonicRoot = useControlsStore(
    (state) => state.semitoneOffsetFromMajorTonicRoot,
  );

  if (semitoneOffsetFromMajorTonicRoot === null) return null;

  const currentKeyNotes = getNotes({ firstNote: tuneKeyId }).map(
    ({ sharpNoteName }) => sharpNoteName,
  );

  return currentKeyNotes[semitoneOffsetFromMajorTonicRoot % 12];
}
