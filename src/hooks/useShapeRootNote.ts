import { useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";

export function useShapeRootNote() {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);

  if (currentShapeSemitoneOffsetFromC === null) return null;

  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;

  const currentKeyNotes = getNotes({ firstNote: currentKeyId }).map(({ sharpNoteName, flatNoteName }) =>
    isFlatTune ? flatNoteName : sharpNoteName,
  );

  return currentKeyNotes[currentShapeSemitoneOffsetFromC % 12];
}
