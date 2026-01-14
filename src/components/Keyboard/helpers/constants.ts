import { getNotes, type Note } from "@/utils/getNotes/getNotes";

export const KEY_PADDING = 0.75; //* for proper css calc
export const numberOfKeys = 49;
export const transitionStepTime = 1000;

export const firstNote: Note = "E";
export const notes = getNotes({ length: numberOfKeys, firstNote, firstOctave: 2 });

export const lastNote: string = notes[notes.length - 1].sharpNoteName;

const notesSequence = getNotes({ length: 12, firstNote });
export const firstAIndex = notesSequence.findIndex((n) => n.sharpNoteName === "A");

export const LEFT_PADDING_FACTOR =
  (firstNote as string) === "C" || (firstNote as string) === "F" ? 0 : 1;
export const RIGHT_PADDING_FACTOR = lastNote === "E" || lastNote === "B" ? 0 : 1;

const TOTAL_PADDING = (LEFT_PADDING_FACTOR + RIGHT_PADDING_FACTOR) * KEY_PADDING;
export const KEY_WIDTH_CSS = (total: number) => `(100% / (${total} + ${TOTAL_PADDING}))`;
