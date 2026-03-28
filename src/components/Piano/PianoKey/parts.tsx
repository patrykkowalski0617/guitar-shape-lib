import styled, { css } from "styled-components";
import { transitionTime } from "@/data/constants";

export const instrumentElBRadius = "4px";
export const instrumentBRadius = "var(--radius-lg)";

type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

const commonStyleForKey = css`
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  will-change: box-shadow, border-color, filter;
  transition:
    box-shadow ${transitionTime}ms ease-in-out,
    filter ${transitionTime}ms ease-in-out;
  background-color: color-mix(in oklab, var(--accent) 5%, var(--background));
  background-color: color-mix(in oklab, var(--accent) 5%, transparent);
`;

export const keyWidth = "26px";
const keyMargin = "1px";
const keyBorderWidth = "1px";
const blackKeyH = "85px";
const borderColor = `color-mix(in oklab, var(--border) 60%, var(--background))`;

const commonStyleForKeyBase = css`
  width: ${keyWidth};
  margin: ${keyMargin};
  padding-top: 10px;
  display: flex;
  justify-content: center;
  flex: none;
`;

export const WhiteKeyFulfill = styled.div`
  ${commonStyleForKey}
  position: absolute;
  inset: 0;
  &::after,
  &::before {
    content: "";
    display: block;
    height: calc(${blackKeyH} + ${keyMargin} * 2);
    border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
    position: absolute;
    background-color: var(--background);
    top: calc(${keyBorderWidth} * -1);
  }
`;

const pianoKeyShapes: Record<KeyShape, ReturnType<typeof css>> = {
  C: css`
    ${WhiteKeyFulfill} {
      right: -19px;
      &::after {
        display: none;
      }
      &::before {
        right: -1px;
        width: 20px;
        border-right-color: var(--background);
        border-top-color: var(--background) !important;
        border-radius: 0px 0px 0px 6px;
      }
    }
  `,
  D: css`
    ${WhiteKeyFulfill} {
      right: -9.5px;
      left: -9.5px;
      &::after {
        left: calc(${keyBorderWidth} * -1);
        width: 10px;
        border-left-color: var(--background);
        border-top-color: var(--background) !important;
        border-radius: 0px 0px 6px 0;
      }
      &::before {
        right: calc(${keyBorderWidth} * -1);
        width: 10px;
        border-right-color: var(--background);
        border-top-color: var(--background) !important;
        border-radius: 0px 0px 0 6px;
      }
    }
  `,
  E: css`
    ${WhiteKeyFulfill} {
      left: -19px;
      &::after {
        display: none;
      }
      &::before {
        left: -1px;
        width: 20px;
        border-left-color: var(--background);
        border-top-color: var(--background) !important;
        border-radius: 0px 0px 6px 0;
      }
    }
  `,
  F: css`
    ${WhiteKeyFulfill} {
      right: -21px;
      &::after {
        display: none;
      }
      &::before {
        right: -1px;
        width: 22px;
        border-right-color: var(--background);
        border-top-color: var(--background) !important;
        border-radius: 0px 0px 0px 6px;
      }
    }
  `,
  G: css`
    ${WhiteKeyFulfill} {
      right: -14px;
      left: -7px;
      &::after {
        left: calc(${keyBorderWidth} * -1);
        width: 8px;
        border-left-color: var(--background);
        border-top-color: var(--background) !important;
        border-radius: 0px 0px 6px 0;
      }
      &::before {
        right: calc(${keyBorderWidth} * -1);
        width: 14.5px;
        border-right-color: var(--background);
        border-top-color: var(--background) !important;
        border-radius: 0px 0px 0 6px;
      }
    }
  `,
  A: css`
    ${WhiteKeyFulfill} {
      right: -7px;
      left: -14px;
      &::after {
        left: calc(${keyBorderWidth} * -1);
        width: 14.5px;
        border-left-color: var(--background);
        border-top-color: var(--background) !important;
        border-radius: 0px 0px 6px 0;
      }
      &::before {
        right: calc(${keyBorderWidth} * -1);
        width: 8px;
        border-right-color: var(--background);
        border-top-color: var(--background) !important;
        border-radius: 0px 0px 0 6px;
      }
    }
  `,
  B: css`
    ${WhiteKeyFulfill} {
      left: -21px;
      &::after {
        display: none;
      }
      &::before {
        left: -1px;
        width: 22px;
        border-left-color: var(--background);
        border-top-color: var(--background) !important;
        border-radius: 0px 0px 6px 0;
      }
    }
  `,
};

const whitePianoKey = css`
  ${commonStyleForKeyBase};
  position: relative;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  height: 140px;
`;

const blackPianoKey = css`
  ${commonStyleForKey}
  ${commonStyleForKeyBase};
  background-color: var(--background);
  height: ${blackKeyH};
  overflow: hidden;
  border: ${keyBorderWidth} solid ${borderColor};
  z-index: 10;
`;

export const Key = styled.div<{
  $isShapeSelected: boolean;
  $isWhitePianoKey: boolean;
  $pianoKeyShape?: KeyShape;
  $isHighlighted?: boolean;
  $isActiveNote: boolean;
  $isTuneKeyNote: boolean;
  $isShapeNote: boolean;
  $isRoleNote: boolean;
}>`
  position: relative;
  filter: ${({ $isActiveNote }) => ($isActiveNote ? "brightness(3)" : "")};

  ${({ $isTuneKeyNote }) => {
    return $isTuneKeyNote
      ? css`
          /* z-index: 3; */
          ${WhiteKeyFulfill} {
            border: ${borderColor} ${keyBorderWidth} solid !important;
            &::after,
            &::before {
              border: ${borderColor} ${keyBorderWidth} solid;
            }
          }
        `
      : "";
  }};

  ${({ $isWhitePianoKey }) =>
    $isWhitePianoKey ? whitePianoKey : blackPianoKey}

  ${({ $pianoKeyShape }) => $pianoKeyShape && pianoKeyShapes[$pianoKeyShape]}

  ${({ $isShapeNote, $isHighlighted, $isWhitePianoKey, $isRoleNote }) => {
    if (!$isHighlighted) return null;
    const color = $isShapeNote ? borderColor : "var(--accent)";

    const shadow = $isWhitePianoKey
      ? `inset 0 -23px 35px -4px ${color}`
      : `inset 0 -10px 30px 0px color-mix(in oklab, ${color} 80%, var(--background))`;
    const target = $isWhitePianoKey
      ? css`
          ${WhiteKeyFulfill}
        `
      : css`&`;

    return css`
      ${target} {
        ${$isRoleNote || $isShapeNote ? `box-shadow: ${shadow};` : ""}
      }
    `;
  }}

${({ $isWhitePianoKey }) => {
    const target = $isWhitePianoKey
      ? css`
          ${WhiteKeyFulfill}
        `
      : css`&`;
    return css`
      ${target} {
      }
    `;
  }} 
   &:first-child ${WhiteKeyFulfill} {
    border-radius: ${instrumentBRadius} 0 ${instrumentElBRadius}
      ${instrumentElBRadius};

    &::before,
    &::after {
      display: none;
    }
  }
  &:last-child ${WhiteKeyFulfill} {
    border-radius: 0 ${instrumentBRadius} ${instrumentElBRadius}
      ${instrumentElBRadius};
  }
`;
