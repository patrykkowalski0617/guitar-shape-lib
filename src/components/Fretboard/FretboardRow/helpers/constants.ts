import type { Note } from "@/utils";

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
