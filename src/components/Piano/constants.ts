import { css } from "styled-components";

export type BlackKeyTypes = "C#" | "D#" | "F#" | "G#" | "A#";

export type WhiteKeyTypes = "C" | "D" | "E" | "F" | "G" | "A" | "B";

export type KeyTypes = WhiteKeyTypes | BlackKeyTypes;

export const transition = css`
  transition: 0.15s;
`;
