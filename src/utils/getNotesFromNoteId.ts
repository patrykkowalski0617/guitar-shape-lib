import type { NoteSharp } from "@/data";
import { getNotes, type NoteId, type NoteObject } from "./getNotes";

interface GetNotesFromNoteIdProps {
  noteId: NoteId;
  length?: number;
}

export const getNotesFromNoteId = ({
  noteId,
  length = 12,
}: GetNotesFromNoteIdProps): NoteObject[] => {
  const [noteName, octaveStr] = noteId.split("-");
  const octave = parseInt(octaveStr, 10);

  const isValidNoteName = !!noteName;
  const isValidOctave = !isNaN(octave);

  if (!isValidNoteName || !isValidOctave) {
    throw new Error(
      `Invalid NoteId format: ${noteId}. Expected format: "NoteName-Octave" (e.g., "C#-2")`,
    );
  }

  return getNotes({
    firstNote: noteName as NoteSharp,
    firstOctave: octave,
    length,
  });
};
