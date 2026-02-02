import type { Note } from "@/utils";

interface STRINGS_CONFIG {
  firstNoteInRow: Note;
  octaveNumber: number;
}

export const STRINGS_CONFIG = [
  { firstNoteInRow: "E", octaveNumber: 4 },
  { firstNoteInRow: "B", octaveNumber: 3 },
  { firstNoteInRow: "G", octaveNumber: 3 },
  { firstNoteInRow: "D", octaveNumber: 3 },
  { firstNoteInRow: "A", octaveNumber: 2 },
  { firstNoteInRow: "E", octaveNumber: 2 },
] as const;

export const numberOfFrets = 25;
