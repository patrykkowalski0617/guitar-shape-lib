import { getNotes, type Note } from "@/utils";

export const KEY_PADDING = 0.75;
export const numberOfKeys = 44;
export const keysOffset = 5;

const CHROMATIC_SCALE = getNotes({ length: 12 });
export const firstNote = CHROMATIC_SCALE[((keysOffset % 12) + 12) % 12] as Note;
export const notes = getNotes({ length: numberOfKeys, firstNote });

const notesSequence = getNotes({ length: 12, firstNote });
export const firstAIndex = notesSequence.findIndex((n) => n === "A");
export const KEY_WIDTH_CSS = (total: number) => `(100% / (${total} + ${KEY_PADDING}))`;
