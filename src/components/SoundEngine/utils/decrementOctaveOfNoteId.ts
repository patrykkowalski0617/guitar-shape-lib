import type { NoteId } from "@/utils";

export const decrementOctaveOfNoteId = (noteId: NoteId): NoteId => {
  const match = noteId.match(/([A-G]#?)-?(\d+)$/);

  if (!match) {
    return noteId;
  }

  const [, note, octaveStr] = match;
  const octave = parseInt(octaveStr, 10);

  if (octave <= 0) {
    return noteId;
  }

  const newOctave = octave - 1;
  return `${note}-${newOctave}` as NoteId;
};
