import { getNotes } from "@/utils";
import { numberOfFrets, STRINGS_CONFIG } from "../constants";
import type { NoteName } from "@/data";

export const getAllFretboardNotes = () =>
  STRINGS_CONFIG.map(({ firstNoteInRow, firstNoteOctaveNumber }) =>
    getNotes({
      firstNote: firstNoteInRow as NoteName,
      length: numberOfFrets,
      firstOctave: firstNoteOctaveNumber,
    }),
  );
