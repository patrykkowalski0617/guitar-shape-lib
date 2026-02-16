import { NOTES_FLAT, NOTES_SHARP, type NoteFlat, type NoteSharp } from "@/data";

export interface NoteObject {
  sharpNoteName: NoteSharp;
  flatNoteName: NoteFlat;
  octaveNumber: number;
  isEnharmonic: boolean;
  noteId: string;
}

export const getNotes = ({
  firstNote = "C",
  firstOctave = 0,
  length = 12,
}: {
  firstNote?: NoteSharp | NoteFlat;
  firstOctave?: number;
  length?: number;
}): NoteObject[] => {
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

    const sharpNoteName = NOTES_SHARP[noteIndex];
    const flatNoteName = NOTES_FLAT[noteIndex];
    const octaveNumber = firstOctave + octaveOffset;
    const isEnharmonic = flatNoteName !== sharpNoteName;
    const noteId = `${sharpNoteName}-${octaveNumber}`;

    return {
      sharpNoteName,
      flatNoteName,
      octaveNumber,
      isEnharmonic,
      noteId,
    };
  });
};
