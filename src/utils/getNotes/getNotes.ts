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

type NotesSharp = (typeof NOTES_SHARP)[number];
type NotesFlat = (typeof NOTES_FLAT)[number];
export type Note = NotesSharp | NotesFlat;

interface GetNotesArgs {
  firstNote?: Note;
  length?: number;
  isFlatKey?: boolean;
}

export const getNotes = ({
  firstNote = "C",
  length = 12,
  isFlatKey = false,
}: GetNotesArgs): Note[] => {
  const notes: readonly Note[] = isFlatKey ? NOTES_FLAT : NOTES_SHARP;

  const startIndex = notes.indexOf(firstNote as Note);

  if (startIndex === -1) {
    throw new Error(
      `Note "${firstNote}" is not compatible with the selected scale or is not a valid note.`
    );
  }

  return Array.from({ length: length }, (_, i) => notes[(startIndex + i) % notes.length]);
};
