import { getNotes } from "@/utils";
import { useShapeOptions } from "./useShapeOptions";
import { useControlsStore } from "@/store";
import { BASE_CHORDS, UNIFIED_MUSIC_KEYS } from "@/data";

export const useSortedShapeOptions = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const toggleBaseChordId = useControlsStore(
    (state) => state.toggleBaseChordId,
  );
  const options = useShapeOptions();

  if (!toggleBaseChordId || !options) return;

  const baseChordSemitoneOffset =
    BASE_CHORDS[toggleBaseChordId].semitoneOffsetFromMajorScaleRoot;

  const firstNote = UNIFIED_MUSIC_KEYS[tuneKeyId].majorName;
  const isFlatTune = UNIFIED_MUSIC_KEYS[tuneKeyId].isFlatTune;

  const notesFromScaleRoot = getNotes({ firstNote, length: 24 });
  const notesFromBaseChordRoot = notesFromScaleRoot.slice(
    baseChordSemitoneOffset,
    baseChordSemitoneOffset + 12,
  );
  const sortReferenceNotes = notesFromBaseChordRoot.map((note) =>
    isFlatTune ? note.flatNoteName : note.sharpNoteName,
  );

  const sortedOptions = sortReferenceNotes.flatMap((referenceNote) =>
    options.filter((option) => option.labelRootNote === referenceNote),
  );

  return sortedOptions;
};
