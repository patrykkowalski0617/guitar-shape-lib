import { getNotes } from "@/utils";
import { useShapeOptions } from "./useShapeOptions";
import { useControlsStore } from "@/store";
import { BASE_CHORDS, UNIFIED_MUSIC_KEYS } from "@/data";

export const useSortedShapeOptions = () => {
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const options = useShapeOptions();

  if (!baseChordDataKey || !options) return;

  const baseChordSemitoneOffset =
    BASE_CHORDS[baseChordDataKey].semitoneOffsetFromMajorRoot;

  const firstNote = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].majorName;
  const isFlatTune = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].isFlatTune;

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
