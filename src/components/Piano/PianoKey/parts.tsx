import styled, { css } from "styled-components";
import { Note } from "@/components/NoteLabel/parts";

export const instrumentElBRadius = "4px";
export const instrumentBRadius = "var(--radius-lg)";

type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

const keyBorderWidth = 1;
const blackKeyH = 85;
const blackKeyW = 23;
const keysGap = 2;
const tripleBlackKeysOffset = blackKeyW / 4 + 2;
const doubleBlackKeysOffset = tripleBlackKeysOffset - 3;
const borderColor = `color-mix(in oklab, var(--border) 60%, var(--background))`;

const baseCutCalc = `${blackKeyW}px / 2 + ${keysGap}px + 1px`;
const wideCutWidth = css`calc(${baseCutCalc} + ${doubleBlackKeysOffset}px)`;
const widerCutWidth = css`calc(${baseCutCalc} + ${tripleBlackKeysOffset}px)`;
const narrowCutWidth = css`calc(${baseCutCalc} - ${doubleBlackKeysOffset}px)`;
const narrowerCutWidth = css`calc(${baseCutCalc} - ${tripleBlackKeysOffset}px)`;
const simpleCutWidth = css`calc(${baseCutCalc})`;

const commonStyleForKeyBase = css`
  flex: 1 1 0;
  display: flex;
  justify-content: center;
`;

const commonStyleForKeyBackground = css`
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  background-color: color-mix(in oklab, var(--accent) 5%, transparent);
`;

export const WhiteKeyJustifyContainer = styled.div`
  position: relative;
`;

const whiteKeyStyles: Record<KeyShape, ReturnType<typeof css>> = {
  C: css`
    justify-content: flex-start;
    &::after {
      display: none;
    }
    &::before {
      right: -1px;
      width: ${wideCutWidth};
      border-right: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${wideCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  F: css`
    justify-content: flex-start;
    &::after {
      display: none;
    }
    &::before {
      right: -1px;
      width: ${widerCutWidth};
      border-right: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${widerCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  E: css`
    justify-content: flex-end;
    &::after {
      display: none;
    }
    &::before {
      left: -1px;
      width: ${wideCutWidth};
      border-left: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 6px 0;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${wideCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  B: css`
    justify-content: flex-end;
    &::after {
      display: none;
    }
    &::before {
      left: -1px;
      width: ${widerCutWidth};
      border-left: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 6px 0;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${widerCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  D: css`
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: ${narrowCutWidth};
      border-left: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: ${narrowCutWidth};
      border-right: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${narrowCutWidth} - ${narrowCutWidth});
    }
    ${Note} {
      left: 50%;
    }
  `,
  G: css`
    justify-content: flex-start;
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: ${narrowerCutWidth};
      border-left: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: ${simpleCutWidth};
      border-right: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${narrowerCutWidth} - ${simpleCutWidth});
      left: ${narrowerCutWidth};
    }
    ${Note} {
      left: 50%;
    }
  `,
  A: css`
    justify-content: flex-start;
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: ${simpleCutWidth};
      border-left: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: ${narrowerCutWidth};
      border-right: calc(${keyBorderWidth}px) solid var(--background);
      border-radius: 0 0 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - ${simpleCutWidth} - ${narrowerCutWidth});
      left: ${simpleCutWidth};
    }
    ${Note} {
      left: 50%;
    }
  `,
};

const blackKeysStyles: Record<string, ReturnType<typeof css>> = {
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

const pseudoElKeyBase = css`
  content: "";
  display: block;
  border-width: ${keyBorderWidth}px;
  border-style: solid;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  position: absolute;
`;

const whiteKeyCommon = css`
  ${commonStyleForKeyBase}
  ${commonStyleForKeyBackground}
  position: relative;
  border-width: ${keyBorderWidth}px;
  border-style: solid;
  margin: 0 ${keysGap}px;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  height: 140px;
  &::after,
  &::before {
    ${pseudoElKeyBase}
    height: calc(${blackKeyH}px + ${keysGap}px + 2px);
    background-color: var(--background);
    border-top: calc(${keyBorderWidth}px + 3px) solid var(--background);
    z-index: 1;
    top: -1px;
  }
`;

const blackKeyCommon = css`
  ${commonStyleForKeyBackground}
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

export const Key = styled.div<{
  $isShapeSelected: boolean;
  $isWhitePianoKey: boolean;
  $pianoKeyShape?: KeyShape;
  $isHighlighted?: boolean;
  $isActiveNote: boolean;
  $isShapeNote: boolean;
  $isRoleNote: boolean;
  $isTuneNote: boolean;
}>`
  position: relative;

  ${({ $isActiveNote }) =>
    $isActiveNote &&
    css`
      filter: brightness(2);
    `}

  ${({ $isTuneNote, $pianoKeyShape }) => {
    const boxShadowColor =
      "color-mix(in oklab, var(--secondary) 80%, var(--background))";
    const defaultShadow = `inset 0 0 2px 0 ${boxShadowColor}`;

    const blackKeyShadow = css`
      &::before {
        box-shadow: ${defaultShadow};
      }
    `;

    const keySpecificStyles: Record<string, ReturnType<typeof css>> = {
      C: css`
        box-shadow: ${defaultShadow};
        &::before {
          box-shadow: -2px 2px 2px -2px ${boxShadowColor};
        }
      `,
      D: css`
        box-shadow: ${defaultShadow};
        &::before {
          box-shadow: -2px 2px 2px -2px ${boxShadowColor};
        }
        &::after {
          box-shadow: 2px 2px 2px -2px ${boxShadowColor};
        }
      `,
      E: css`
        box-shadow: ${defaultShadow};
        &::before {
          box-shadow: 2px 2px 2px -2px ${boxShadowColor};
        }
      `,
      F: css`
        box-shadow: ${defaultShadow};
        &::before {
          box-shadow: -2px 2px 2px -2px ${boxShadowColor};
        }
      `,
      G: css`
        box-shadow: ${defaultShadow};
        &::before {
          box-shadow: -2px 2px 2px -2px ${boxShadowColor};
        }
        &::after {
          box-shadow: 2px 2px 2px -2px ${boxShadowColor};
        }
      `,
      A: css`
        box-shadow: ${defaultShadow};
        &::before {
          box-shadow: -2px 2px 2px -2px ${boxShadowColor};
        }
        &::after {
          box-shadow: 2px 2px 2px -2px ${boxShadowColor};
        }
      `,
      B: css`
        box-shadow: ${defaultShadow};
        &::before {
          box-shadow: 2px 2px 2px -2px ${boxShadowColor};
        }
      `,
      "C#": blackKeyShadow,
      "D#": blackKeyShadow,
      "F#": blackKeyShadow,
      "G#": blackKeyShadow,
      "A#": blackKeyShadow,
    };

    const activeShapeStyle = $pianoKeyShape
      ? keySpecificStyles[$pianoKeyShape]
      : css``;

    const activeStyle = css`
      border-color: var(--secondary);
      ${activeShapeStyle}
      &::before,
      &::after {
        border-color: var(--secondary);
      }
    `;

    const standardStyle = css`
      border-color: ${borderColor};
      &::before,
      &::after {
        border-color: ${borderColor};
      }
    `;

    return $isTuneNote ? activeStyle : standardStyle;
  }}

  ${({ $isWhitePianoKey }) =>
    $isWhitePianoKey ? whiteKeyCommon : blackKeyCommon}
  ${({ $pianoKeyShape }) => $pianoKeyShape && whiteKeyStyles[$pianoKeyShape]}
  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && blackKeysStyles[$pianoKeyShape as string]}

  ${({ $isShapeNote, $isHighlighted, $isWhitePianoKey, $isRoleNote }) => {
    if (!$isHighlighted) return null;

    const highlightColor = $isShapeNote ? borderColor : "var(--accent)";
    const whiteShadow = `inset 0 -23px 35px -4px ${highlightColor}`;
    const blackShadow = `inset 0 -10px 30px 0px color-mix(in oklab, ${highlightColor} 80%, var(--background))`;
    const shadowEffect = $isWhitePianoKey ? whiteShadow : blackShadow;

    const shouldShowShadow = $isRoleNote || $isShapeNote;
    return shouldShowShadow
      ? css`
          box-shadow: ${shadowEffect};
        `
      : null;
  }}

  &:first-child {
    border-radius: ${instrumentBRadius} 0 ${instrumentElBRadius}
      ${instrumentElBRadius};
    &::before,
    &::after {
      display: none;
    }
  }

  &:last-child {
    border-radius: 0 ${instrumentBRadius} ${instrumentElBRadius}
      ${instrumentElBRadius};
  }
`;
