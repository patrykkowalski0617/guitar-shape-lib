import styled, { css } from "styled-components";
import {
  blackKeyH,
  blackKeyW,
  commonStyleForKeyBase,
  doubleBlackKeysOffset,
  pseudoElKeyBase,
  tripleBlackKeysOffset,
} from "./constants";
import { transition, type BlackKeyTypes } from "../../constants";

export const BlacKeyJustifyContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 20;
`;

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

export const blackKeysWrapperStyles: Partial<
  Record<BlackKeyTypes, ReturnType<typeof css>>
> = {
  "C#": css`
    ${BlacKeyJustifyContainer} {
      transform: translateX(-${doubleBlackKeysOffset}px);
    }
  `,
  "D#": css`
    ${BlacKeyJustifyContainer} {
      transform: translateX(${doubleBlackKeysOffset}px);
    }
  `,
  "F#": css`
    ${BlacKeyJustifyContainer} {
      transform: translateX(-${tripleBlackKeysOffset}px);
    }
  `,
  "A#": css`
    ${BlacKeyJustifyContainer} {
      transform: translateX(${tripleBlackKeysOffset}px);
    }
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
    ${transition}
    box-shadow: 3px 3px 6px 3px
    color-mix(in oklab, var(--background) 90%, transparent);
    width: ${blackKeyW}px;
    height: 100%;
    background-color: var(--background);
    top: 0px;
    z-index: 9;
    border-right-color: color-mix(
      in oklab,
      var(--muted) 90%,
      var(--background)
    ) !important;
    border-left-color: color-mix(
      in oklab,
      var(--fretboard) 100%,
      var(--background)
    );
    border-left-width: 2px;
  }
`;

export const blackKeyWrapperCommon = css`
  height: 100%;
  flex: 0 0 0;
`;
