import type { Note } from "@/utils";

interface STRINGS_FIRST_NOTES {
  noteName: Note;
  octaveNumber: number;
}

export const STRINGS_FIRST_NOTES = [
  { noteName: "E", octaveNumber: 0 },
  { noteName: "B", octaveNumber: 0 },
  { noteName: "G", octaveNumber: 0 },
  { noteName: "D", octaveNumber: 0 },
  { noteName: "A", octaveNumber: 0 },
  { noteName: "E", octaveNumber: 0 },
] as const;
export const numberOfFrets = 25;
