import { BASE_CHORDS_MAP, UNIFIED_MUSIC_KEYS, type TuneKeyId } from "@/data";
import { getNotes } from "@/utils";

export const useBaseChordOptions = () => {
  const keyEntries = Object.entries(UNIFIED_MUSIC_KEYS) as [
    TuneKeyId,
    (typeof UNIFIED_MUSIC_KEYS)[TuneKeyId],
  ][];

  const optionsPerKey = keyEntries.map(([tuneKeyId, keyData]) => {
    const firstNote = keyData.majorName;
    const notes = getNotes({ firstNote });
    const isFlatTune = UNIFIED_MUSIC_KEYS[tuneKeyId].isFlatTune;
    const chords = Object.entries(BASE_CHORDS_MAP).map(
      ([chordId, chordData]) => {
        const noteAtOffset = notes[chordData.semitoneOffsetFromMajorScaleRoot];
        const isMajorMode = chordData.isMajorMode;

        const noteName = isFlatTune
          ? noteAtOffset.flatNoteName
          : noteAtOffset.sharpNoteName;
        const chordName = `${noteName}${isMajorMode ? "" : "m"}`;

        return {
          id: chordId,
          combinedId: `${tuneKeyId}:${chordId}`,
          chordName,
        };
      },
    );

    return {
      tuneKeyId,
      label: `${keyData.majorName}/${keyData.relativeMinorName}`,
      chords,
    };
  });

  return optionsPerKey;
};
