import { UNIFIED_MUSIC_KEYS } from "@/data";
import { useEnharmonicNoteName } from "@/hooks";
import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";

export const useBaseChordsNames = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const firstNote = UNIFIED_MUSIC_KEYS[tuneKeyId].majorName;
  const notes = getNotes({ firstNote });
  const getEnharmonicNoteName = useEnharmonicNoteName();

  const getChordMode = (semitoneOffsetFromMajorScaleRoot: number) => {
    const minorChordsIndexes = [2, 9];
    const bothModesChordsIndexes = [4];

    return bothModesChordsIndexes.includes(semitoneOffsetFromMajorScaleRoot)
      ? "/m"
      : minorChordsIndexes.includes(semitoneOffsetFromMajorScaleRoot)
        ? "m"
        : "";
  };

  const getBaseChordName = ({
    semitoneOffsetFromMajorScaleRoot,
  }: {
    semitoneOffsetFromMajorScaleRoot: number;
  }) => {
    const noteAtOffset = notes[semitoneOffsetFromMajorScaleRoot];
    const chordName = getEnharmonicNoteName(noteAtOffset);
    const chordMode = getChordMode(semitoneOffsetFromMajorScaleRoot);

    const isNoteAvailable = !!noteAtOffset;
    const fullChordName = `${chordName}${chordMode}`;

    return isNoteAvailable && fullChordName;
  };

  return getBaseChordName;
};
