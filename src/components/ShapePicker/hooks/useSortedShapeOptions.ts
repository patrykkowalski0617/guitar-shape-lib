import { getNotes } from "@/utils";
import { useDataKeyStore } from "@/store";
import { BASE_CHORDS, UNIFIED_MUSIC_KEYS } from "@/data";
import { useShapeOptions } from "./useShapeOptions";

export const useSortedShapeOptions = () => {
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (s) => s.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useDataKeyStore((s) => s.baseChordDataKey);
  const options = useShapeOptions();

  if (!baseChordDataKey || !options || !unifiedMusicKeysDataKey) return;

  const baseChordSemitoneOffset =
    BASE_CHORDS[baseChordDataKey].semitoneOffsetFromMajorRoot;

  const firstNote = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].majorFirstNote;
  const isFlatTune = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey].isFlatTune;

  const notesFromScaleRoot = getNotes({ firstNote, length: 24 });
  const notesFromBaseChordRoot = notesFromScaleRoot.slice(
    baseChordSemitoneOffset,
    baseChordSemitoneOffset + 12,
  );
  const sortReferenceNotes = notesFromBaseChordRoot.map((noteObject) =>
    isFlatTune ? noteObject.flatNoteName : noteObject.sharpNoteName,
  );

  const sortedOptions = sortReferenceNotes.flatMap((referenceNote) =>
    options.filter((option) => option.labelRootNote === referenceNote),
  );

  return sortedOptions;
};
