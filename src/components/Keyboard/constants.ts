import { getNotes } from "@/utils";

const CHROMATIC_SCALE = getNotes({});
export const keysOffset = 5;
const firstNote = CHROMATIC_SCALE[((keysOffset % 12) + 12) % 12];
export const numberOfKeys = 43;
export const notes = getNotes({ length: numberOfKeys, firstNote });
