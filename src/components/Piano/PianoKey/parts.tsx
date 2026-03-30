import styled, { css } from "styled-components";
import { transitionTime } from "@/data/constants";
import NoteLabel from "@/components/NoteLabel/NoteLabel";
import { Note, NoteWrapper } from "@/components/NoteLabel/parts";

export const instrumentElBRadius = "4px";
export const instrumentBRadius = "var(--radius-lg)";

type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

const commonStyleForKey = css`
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  background-color: color-mix(in oklab, var(--accent) 5%, var(--background));
  background-color: color-mix(in oklab, var(--accent) 5%, transparent);
`;

const keyBorderWidth = "1px";
const blackKeyH = 85;
const blackKeyW = 25;
const borderColor = `color-mix(in oklab, var(--border) 60%, var(--background))`;

const commonStyleForKeyBase = css`
  flex: 1 1 0;
  display: flex;
  justify-content: center;
`;

const blackKeysOffset = blackKeyW / 5;

const pianoKeyShapes: Record<KeyShape, ReturnType<typeof css>> = {
  C: css`
    justify-content: flex-start;
    &::after {
      display: none;
    }
    &::before {
      right: -1px;
      width: calc(${blackKeyW}px / 2 + 2px + ${blackKeysOffset}px);
      border-right-color: var(--background);
      border-radius: 0px 0px 0px 6px;
    }
    ${NoteWrapper} {
      width: calc(100% - (${blackKeyW}px / 2 + 2px + ${blackKeysOffset}px));
    }
    ${Note} {
      left: 50%;
    }
  `,
  D: css`
    &::after {
      left: calc(${keyBorderWidth} * -1);
      width: calc(${blackKeyW}px / 2 + 2px - ${blackKeysOffset}px);
      border-left-color: var(--background);
      border-radius: 0px 0px 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1);
      width: calc(${blackKeyW}px / 2 + 2px - ${blackKeysOffset}px);
      border-right-color: var(--background);
      border-radius: 0px 0px 0 6px;
    }
    ${NoteWrapper} {
      width: calc(100% - (${blackKeyW}px / 2 + 2px - ${blackKeysOffset}px));
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
      width: calc(${blackKeyW}px / 2 + 2px + ${blackKeysOffset}px);
      border-left-color: var(--background);
      border-radius: 0px 0px 6px 0;
    }
    ${NoteWrapper} {
      width: calc(100% - (${blackKeyW}px / 2 + 2px + ${blackKeysOffset}px));
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
      width: calc(${blackKeyW}px / 2 + 2px + ${blackKeysOffset}px);
      border-right-color: var(--background);
      border-radius: 0px 0px 0px 6px;
    }
    ${NoteWrapper} {
      width: calc(100% - (${blackKeyW}px / 2 + 1px + ${blackKeysOffset}px));
    }
    ${Note} {
      left: 50%;
    }
  `,
  G: css`
    justify-content: flex-start;
    &::after {
      left: calc(${keyBorderWidth} * -1);
      width: calc(${blackKeyW}px / 2 + 2px - ${blackKeysOffset}px);
      border-left-color: var(--background);
      border-radius: 0px 0px 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1);
      width: calc(${blackKeyW}px / 2 + 2px);
      border-right-color: var(--background);
      border-radius: 0px 0px 0 6px;
    }
    ${NoteWrapper} {
      width: calc(
        100% - (${blackKeyW}px / 2 + 2px - ${blackKeysOffset}px) -
          (${blackKeyW}px / 2 + 2px)
      );
      left: calc(${blackKeyW}px / 2 + 2px - ${blackKeysOffset}px);
    }
    ${Note} {
      left: 50%;
    }
  `,
  A: css`
    justify-content: flex-start;
    &::after {
      left: calc(${keyBorderWidth} * -1);
      width: calc(${blackKeyW}px / 2 + 2px);
      border-left-color: var(--background);
      border-radius: 0px 0px 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1);
      width: calc(${blackKeyW}px / 2 + 2px - ${blackKeysOffset}px);
      border-right-color: var(--background);
      border-radius: 0px 0px 0 6px;
    }
    ${NoteWrapper} {
      width: calc(
        100% - (${blackKeyW}px / 2 + 2px - ${blackKeysOffset}px) -
          (${blackKeyW}px / 2 + 2px)
      );
      left: calc(${blackKeyW}px / 2 + 2px);
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
      width: calc(${blackKeyW}px / 2 + 2px + ${blackKeysOffset}px);
      border-left-color: var(--background);
      border-radius: 0px 0px 6px 0;
    }
    ${NoteWrapper} {
      width: calc(100% - (${blackKeyW}px / 2 + 1px + ${blackKeysOffset}px));
    }
    ${Note} {
      left: 50%;
    }
  `,
};

const blackKeyStyles: Record<KeyShape, ReturnType<typeof css>> = {
  "C#": css`
    transform: translateX(-${blackKeysOffset}px);
  `,
  "D#": css`
    transform: translateX(${blackKeysOffset}px);
  `,
  "F#": css`
    transform: translateX(-${blackKeysOffset}px);
  `,
  "A#": css`
    transform: translateX(${blackKeysOffset}px);
  `,
};

const whitePianoKey = css`
  ${commonStyleForKeyBase};
  ${commonStyleForKey}
  position: relative;
  border: ${borderColor} ${keyBorderWidth} solid;
  margin: 0 1px;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  height: 140px;
  &::after,
  &::before {
    content: "";
    display: block;
    height: calc(${blackKeyH}px + 2px);
    border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
    position: absolute;
    border-top-color: var(--background) !important;
    background-color: var(--background);
    border: 1px solid ${borderColor};
    top: calc(${keyBorderWidth} * -1);
    z-index: 1;
    top: -1px;
  }
`;

const blackPianoKey = css`
  ${commonStyleForKey}
  ${commonStyleForKeyBase};
  background-color: var(--background);
  height: calc(${blackKeyH}px - 1px);
  z-index: 10;
  flex-basis: 0;
  flex-grow: 0;
  flex-shrink: 0;
  &::before {
    content: "";
    display: block;
    width: ${blackKeyW}px;
    height: 100%;
    background-color: var(--background);
    position: absolute;
    top: 0px;
    z-index: 9;
    border: ${borderColor} ${keyBorderWidth} solid !important;
    border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  }
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
          &::after,
          &::before {
            /* border: ${borderColor} ${keyBorderWidth} solid; */
          }
        `
      : "";
  }};

  ${({ $isWhitePianoKey }) =>
    $isWhitePianoKey ? whitePianoKey : blackPianoKey}

  ${({ $pianoKeyShape }) => pianoKeyShapes[$pianoKeyShape]}

  ${({ $pianoKeyShape }) => blackKeyStyles[$pianoKeyShape]}


  ${({ $isShapeNote, $isHighlighted, $isWhitePianoKey, $isRoleNote }) => {
    if (!$isHighlighted) return null;
    const color = $isShapeNote ? borderColor : "var(--accent)";

    const shadow = $isWhitePianoKey
      ? `inset 0 -23px 35px -4px ${color}`
      : `inset 0 -10px 30px 0px color-mix(in oklab, ${color} 80%, var(--background))`;
    const target = $isWhitePianoKey ? css`` : css`&`;

    return css`
      ${target} {
        ${$isRoleNote || $isShapeNote ? `box-shadow: ${shadow};` : ""}
      }
    `;
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
