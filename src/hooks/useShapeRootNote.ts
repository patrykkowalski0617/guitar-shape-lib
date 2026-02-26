import { useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";

export function useShapeRootNote() {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeSemitoneOffsetFromC = useControlsStore((state) => state.shapeSemitoneOffsetFromC);

  if (shapeSemitoneOffsetFromC === null) return null;

  const isFlatTune = UNIFIED_MUSIC_KEYS[tuneKeyId].isFlatTune;

  const currentKeyNotes = getNotes({ firstNote: tuneKeyId }).map(({ sharpNoteName, flatNoteName }) =>
    isFlatTune ? flatNoteName : sharpNoteName,
  );

  return currentKeyNotes[shapeSemitoneOffsetFromC % 12];
}
