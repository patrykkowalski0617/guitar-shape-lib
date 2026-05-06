import { css } from "styled-components";
import { getNotes } from "@/utils";
import { type Note } from "@/data";

export type BlackKeyTypes = "C#" | "D#" | "F#" | "G#" | "A#";

export type WhiteKeyTypes = "C" | "D" | "E" | "F" | "G" | "A" | "B";

export type KeyTypes = WhiteKeyTypes | BlackKeyTypes;

export const transition = css`
  transition: 0.05s;
`;

export const numberOfKeys = 49;

const firstNote: Note = "E";

export const pianoNotes = getNotes({
  length: numberOfKeys,
  firstNote,
  firstOctave: 2,
});

export const SHAPES_OF_PIANO_KEYS: Record<number, KeyTypes> = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B",
};
