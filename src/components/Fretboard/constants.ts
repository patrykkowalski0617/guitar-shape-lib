import type { FretboardStringId, Note } from "@/data";

export type StringIndex = 0 | 1 | 2 | 3 | 4 | 5;

export const BASS_STRING_ID_MAP: Record<number, FretboardStringId> = {
  5: "strE",
  4: "strA",
  3: "strD",
};

interface STRINGS_CONFIG {
  firstNoteInRow: Note;
  firstNoteOctaveNumber: number;
}

export const STRINGS_CONFIG = [
  { firstNoteInRow: "E", firstNoteOctaveNumber: 4 },
  { firstNoteInRow: "B", firstNoteOctaveNumber: 3 },
  { firstNoteInRow: "G", firstNoteOctaveNumber: 3 },
  { firstNoteInRow: "D", firstNoteOctaveNumber: 3 },
  { firstNoteInRow: "A", firstNoteOctaveNumber: 2 },
  { firstNoteInRow: "E", firstNoteOctaveNumber: 2 },
] as const;

export const numberOfFrets = 25;
