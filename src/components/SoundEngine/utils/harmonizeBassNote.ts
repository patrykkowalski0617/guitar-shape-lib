import { getNotesFromNoteId } from "@/utils/getNotesFromNoteId";
import type { NoteId } from "@/utils";

export const harmonizeBassNote = (
  bassNoteId: NoteId,
  scaleTemplate: number[],
): string[] => {
  const notesChunk = getNotesFromNoteId({ noteId: bassNoteId, length: 12 });

  const indexForFirst = scaleTemplate[0];
  const indexForThird = scaleTemplate[2];
  const indexForFifth = scaleTemplate[4];

  const harmonyIds = [
    notesChunk[indexForFirst]?.noteId,
    notesChunk[indexForThird]?.noteId,
    notesChunk[indexForFifth]?.noteId,
  ].filter((id): id is NoteId => !!id);

  return harmonyIds;
};
