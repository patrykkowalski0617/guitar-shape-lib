import { getNotesFromNoteId } from "@/utils/getNotesFromNoteId";
import type { NoteId } from "@/utils";

export const harmonizeBassNote = (
  bassNoteId: NoteId,
  scaleTemplate: number[],
): NoteId[] => {
  const notesChunk = getNotesFromNoteId({
    firstNoteNoteId: bassNoteId,
    length: 12,
  });

  const indexForFirst = scaleTemplate[0];
  const indexForThird = scaleTemplate[2];
  const indexForFifth = scaleTemplate[4];

  const harmonyNoteIds = [
    notesChunk[indexForFirst]?.noteId,
    notesChunk[indexForThird]?.noteId,
    notesChunk[indexForFifth]?.noteId,
  ].filter((id): id is NoteId => !!id);

  return harmonyNoteIds;
};
