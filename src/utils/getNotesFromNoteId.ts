import type { NoteSharpName } from "@/data";
import { getNotes, type NoteId, type NoteObject } from "./getNotes";

interface GetNotesFromNoteIdProps {
  firstNoteNoteId: NoteId;
  length?: number;
}

export const getNotesFromNoteId = ({
  firstNoteNoteId,
  length = 12,
}: GetNotesFromNoteIdProps): NoteObject[] => {
  const [noteName, octaveStr] = firstNoteNoteId.split("-");
  const octave = parseInt(octaveStr, 10);

  const isValidNoteName = !!noteName;
  const isValidOctave = !isNaN(octave);

  if (!isValidNoteName || !isValidOctave) {
    throw new Error(
      `Invalid NoteId format: ${firstNoteNoteId}. Expected format: "NoteName-Octave" (e.g., "C#-2")`,
    );
  }

  return getNotes({
    firstNote: noteName as NoteSharpName,
    firstOctave: octave,
    length,
  });
};
