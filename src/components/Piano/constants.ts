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

export const instrumentElBRadius = "4px";
export const instrumentBRadius = "var(--radius-lg)";

export const keyBorderWidth = 1;
export const whiteKeyH = 140;
export const blackKeyH = 85;
export const blackKeyW = 23;
export const keysGap = 1;
export const tripleBlackKeysOffset = blackKeyW / 4 + 2;
export const doubleBlackKeysOffset = tripleBlackKeysOffset - 3;
export const pianoBgColor = `color-mix(in oklab, var(--muted) 15%, var(--background))`;

export const baseCutCalc = `${blackKeyW}px / 2 + ${keysGap}px + 1px`;
export const wideCutWidth = css`calc(${baseCutCalc} + ${doubleBlackKeysOffset}px + 1px) `;
export const widerCutWidth = css`calc(${baseCutCalc} + ${tripleBlackKeysOffset}px + 1px) `;
export const narrowCutWidth = css`calc(${baseCutCalc} - ${doubleBlackKeysOffset}px + 1px) `;
export const narrowerCutWidth = css`calc(${baseCutCalc} - ${tripleBlackKeysOffset}px + 1px) `;
export const simpleCutWidth = css`calc(${baseCutCalc} + 1px) `;

export const commonStyleForKeyBase = css`
  flex: 1 1 0;
  display: flex;
  justify-content: center;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  background: color-mix(in oklab, var(--foreground) 70%, var(--instrument));
`;

export const pseudoElKeyBase = css`
  content: "";
  display: block;
  border-width: ${keyBorderWidth}px;
  border-style: solid;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  position: absolute;
`;
