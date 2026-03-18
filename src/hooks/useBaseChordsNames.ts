import { UNIFIED_MUSIC_KEYS, type RoleId } from "@/data";
import { useEnharmonicNoteName } from "@/hooks";
import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";

export const useBaseChordsNames = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const firstNote = UNIFIED_MUSIC_KEYS[tuneKeyId].majorName;
  const notes = getNotes({ firstNote });
  const getEnharmonicNoteName = useEnharmonicNoteName();

  const getChordMode = (semitoneOffsetFromC: number) => {
    const minorChordsIndexes = [2, 9];
    const bothModesChordsIndexes = [4];

    return bothModesChordsIndexes.includes(semitoneOffsetFromC)
      ? "?m"
      : minorChordsIndexes.includes(semitoneOffsetFromC)
        ? "m"
        : "";
  };

  const getBaseChordName = ({
    semitoneOffsetFromC,
    role,
  }: {
    semitoneOffsetFromC: number;
    role?: RoleId;
  }) => {
    const noteAtOffset = notes[semitoneOffsetFromC];
    const chordName = getEnharmonicNoteName(noteAtOffset);
    const chordMode = getChordMode(semitoneOffsetFromC);

    const isNoteAvailable = !!noteAtOffset;
    const fullChordName = `${chordName}${chordMode}`;

    return isNoteAvailable && fullChordName;
  };

  return getBaseChordName;
};
