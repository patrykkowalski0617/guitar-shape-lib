import { css } from "styled-components";
import {
  blackKeyH,
  blackKeyW,
  commonStyleForKeyBase,
  doubleBlackKeysOffset,
  pseudoElKeyBase,
  tripleBlackKeysOffset,
} from "./constants";

export type BlackKeyTypes = "C#" | "D#" | "F#" | "G#" | "A#";

export const blackKeysStyles: Partial<
  Record<BlackKeyTypes, ReturnType<typeof css>>
> = {
  "C#": css`
    transform: translateX(-${doubleBlackKeysOffset}px);
  `,
  "D#": css`
    transform: translateX(${doubleBlackKeysOffset}px);
  `,
  "F#": css`
    transform: translateX(-${tripleBlackKeysOffset}px);
  `,
  "A#": css`
    transform: translateX(${tripleBlackKeysOffset}px);
  `,
};

export const blackKeyCommon = css`
  ${commonStyleForKeyBase}
  background-color: var(--background);
  height: calc(${blackKeyH}px - 1px);
  z-index: 10;
  flex: 0 0 0;
  &::before {
    ${pseudoElKeyBase}
    width: ${blackKeyW}px;
    height: 100%;
    background-color: var(--background);
    top: 0px;
    z-index: 9;
  }
`;
