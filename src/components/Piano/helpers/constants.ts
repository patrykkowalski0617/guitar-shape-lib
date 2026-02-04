import { getNotes, type Note } from "@/utils/getNotes";
import type { KeyShape } from "../parts";

export const KEY_PADDING = 0.75; //- for proper css calc
export const numberOfKeys = 49;

export const firstNote: Note = "E";
export const pianoNotes = getNotes({ length: numberOfKeys, firstNote, firstOctave: 2 });

const lastNote: string = pianoNotes[pianoNotes.length - 1].sharpNoteName;

export const LEFT_PADDING_FACTOR =
  (firstNote as string) === "C" || (firstNote as string) === "F" ? 0 : 1;
export const RIGHT_PADDING_FACTOR = lastNote === "E" || lastNote === "B" ? 0 : 1;

const TOTAL_PADDING = (LEFT_PADDING_FACTOR + RIGHT_PADDING_FACTOR) * KEY_PADDING;
export const KEY_WIDTH_CSS = (total: number) => `(100% / (${total} + ${TOTAL_PADDING}))`;

export const SHAPES_OF_WHITE_PIANO_KEYS: Record<number, KeyShape> = {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B",
};
