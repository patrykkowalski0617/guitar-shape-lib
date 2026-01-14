import type { Note } from "@/utils";

interface STRINGS_FIRST_NOTES {
  noteName: Note;
  octaveNumber: number;
}

export const STRINGS_FIRST_NOTES = [
  { noteName: "E", octaveNumber: 4 },
  { noteName: "B", octaveNumber: 3 },
  { noteName: "G", octaveNumber: 3 },
  { noteName: "D", octaveNumber: 3 },
  { noteName: "A", octaveNumber: 2 },
  { noteName: "E", octaveNumber: 2 },
] as const;
export const numberOfFrets = 25;
