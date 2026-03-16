import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";

export function useShapeRootSharpNote() {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.shapeSemitoneOffsetFromC,
  );

  if (shapeSemitoneOffsetFromC === null) return null;

  const currentKeyNotes = getNotes({ firstNote: tuneKeyId }).map(
    ({ sharpNoteName }) => sharpNoteName,
  );

  return currentKeyNotes[shapeSemitoneOffsetFromC % 12];
}
