export const NOTES_SHARP = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export const NOTES_FLAT = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
] as const;

export type NoteSharp = (typeof NOTES_SHARP)[number];
export type NoteFlat = (typeof NOTES_FLAT)[number];
export type Note = NoteSharp | NoteFlat;

export interface NoteObject {
  sharpNoteName: NoteSharp;
  flatNoteName: NoteFlat;
  octaveNumber: number;
  isEnharmonic: boolean;
}

interface GetNotesArgs {
  firstNote?: NoteSharp | NoteFlat;
  firstOctave?: number;
  length?: number;
}

export const getNotes = ({
  firstNote = "C",
  firstOctave = 0,
  length = 12,
}: GetNotesArgs): NoteObject[] => {
  const startIndex =
    (NOTES_SHARP as readonly string[]).indexOf(firstNote) !== -1
      ? (NOTES_SHARP as readonly string[]).indexOf(firstNote)
      : (NOTES_FLAT as readonly string[]).indexOf(firstNote);

  if (startIndex === -1) {
    throw new Error(`Note "${firstNote}" is not a valid note.`);
  }

  return Array.from({ length }, (_, i) => {
    const totalIndex = startIndex + i;
    const noteIndex = totalIndex % 12;
    const octaveOffset = Math.floor(totalIndex / 12);

    const sharpName = NOTES_SHARP[noteIndex];
    const flatName = NOTES_FLAT[noteIndex];

    return {
      sharpNoteName: sharpName,
      flatNoteName: flatName,
      octaveNumber: firstOctave + octaveOffset,
      isEnharmonic: sharpName !== flatName,
    };
  });
};
