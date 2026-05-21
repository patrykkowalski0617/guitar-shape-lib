import { getNotes } from "@/utils";
import { STRINGS_CONFIG } from "../constants";
import type { FretboardCoordinate } from "@/data";

export const getNoteIdFromFretboardCoordintes = (
  coordinates: FretboardCoordinate,
) => {
  const stringIndex = coordinates[0];
  const fretIndex = coordinates[1];
  const firstNote = STRINGS_CONFIG[stringIndex].firstNoteInRow;
  const firstOctave = STRINGS_CONFIG[stringIndex].firstNoteOctaveNumber;
  const offsetToAvoidLenghtZero = 1;

  const notes = getNotes({
    firstNote,
    firstOctave,
    length: fretIndex + offsetToAvoidLenghtZero,
  });

  const noteId = notes[notes.length - 1].noteId;

  return noteId;
};
