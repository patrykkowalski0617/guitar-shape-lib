import type { NoteId } from "@/utils";

export const decrementOctaveOfNoteId = (
  noteId: NoteId,
  byOctaveNo: number = 1,
): NoteId => {
  const match = noteId.match(/([A-G]#?)-?(\d+)$/);

  if (!match) {
    return noteId;
  }

  const [, note, octaveStr] = match;
  const octave = parseInt(octaveStr, 10);

  if (octave <= 0) {
    return noteId;
  }

  const newOctave = octave - byOctaveNo;
  return `${note}-${newOctave}` as NoteId;
};
