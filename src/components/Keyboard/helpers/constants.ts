import { getNotes, type Note } from "@/utils";

export const KEY_PADDING = 0.75;
export const numberOfKeys = 44;
export const keysOffset = 4; // 0 = starting form C
export const transitionStepTime = 1500;

const CHROMATIC_SCALE = getNotes({ length: 12 });
export const firstNote = CHROMATIC_SCALE[((keysOffset % 12) + 12) % 12] as Note;
export const notes = getNotes({ length: numberOfKeys, firstNote });
export const lastNote = notes[notes.length - 1];

const notesSequence = getNotes({ length: 12, firstNote });
export const firstAIndex = notesSequence.findIndex((n) => n === "A");
export const LEFT_PADDING_FACTOR = firstNote === "C" || firstNote === "F" ? 0 : 1;
export const RIGHT_PADDING_FACTOR = lastNote === "E" || lastNote === "B" ? 0 : 1;
export const TOTAL_PADDING = (LEFT_PADDING_FACTOR + RIGHT_PADDING_FACTOR) * KEY_PADDING;
export const KEY_WIDTH_CSS = (total: number) => `(100% / (${total} + ${TOTAL_PADDING}))`;
