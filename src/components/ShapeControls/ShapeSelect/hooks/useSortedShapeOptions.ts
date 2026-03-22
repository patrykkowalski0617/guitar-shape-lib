import { getNotes } from "@/utils";
import { useShapeOptions } from "./useShapeOptions";
import { useControlsStore } from "@/store";
import { BASE_CHORDS_MAP, UNIFIED_MUSIC_KEYS } from "@/data";

export const useSortedShapeOptions = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const options = useShapeOptions();

  if (!baseChordId) return;

  const baseChordSemitoneOffset =
    BASE_CHORDS_MAP[baseChordId].semitoneOffsetFromMajorScaleRoot;

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

  const sortedOptions = options;
  console.log({ options, sortReferenceNotes });

  return sortedOptions;
};
