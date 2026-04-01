import styled, { css } from "styled-components";
import { Note } from "@/components/NoteLabel/parts";

export const instrumentElBRadius = "4px";
export const instrumentBRadius = "var(--radius-lg)";

type KeyShape = "C" | "D" | "E" | "F" | "G" | "A" | "B";

const commonStyleForKey = css`
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  background-color: color-mix(in oklab, var(--accent) 5%, var(--background));
  background-color: color-mix(in oklab, var(--accent) 5%, transparent);
`;

const keyBorderWidth = 1;
const blackKeyH = 85;
const blackKeyW = 25;
const keysGap = 2;
const blackKeysOffset = blackKeyW / 4;
const borderColor = `color-mix(in oklab, var(--border) 60%, var(--background))`;

const commonStyleForKeyBase = css`
  flex: 1 1 0;
  display: flex;
  justify-content: center;
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
      width: calc(
        ${blackKeyW}px / 2 + ${keysGap}px + 1px + ${blackKeysOffset}px
      );
      border-right: none;
      border-radius: 0px 0px 0px 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(
        100% - (${blackKeyW}px / 2 + ${keysGap}px + 1px + ${blackKeysOffset}px)
      );
    }
    ${Note} {
      left: 50%;
    }
  `,
  D: css`
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: calc(
        ${blackKeyW}px / 2 + ${keysGap}px + 1px - ${blackKeysOffset}px
      );
      border-left: none;
      border-radius: 0px 0px 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: calc(
        ${blackKeyW}px / 2 + ${keysGap}px + 1px - ${blackKeysOffset}px
      );
      border-right: none;
      border-radius: 0px 0px 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(
        100% - (${blackKeyW}px / 2 + ${keysGap}px + 1px - ${blackKeysOffset}px)
      );
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
      width: calc(
        ${blackKeyW}px / 2 + ${keysGap}px + 1px + ${blackKeysOffset}px
      );
      border-left: none;
      border-radius: 0px 0px 6px 0;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(
        100% - (${blackKeyW}px / 2 + ${keysGap}px + 1px + ${blackKeysOffset}px)
      );
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
      width: calc(
        ${blackKeyW}px / 2 + ${keysGap}px + 1px + ${blackKeysOffset}px
      );
      border-right: none;
      border-radius: 0px 0px 0px 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - (${blackKeyW}px / 2 + 1px + ${blackKeysOffset}px));
    }
    ${Note} {
      left: 50%;
    }
  `,
  G: css`
    justify-content: flex-start;
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: calc(
        ${blackKeyW}px / 2 + ${keysGap}px + 1px - ${blackKeysOffset}px
      );
      border-left: none;
      border-radius: 0px 0px 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: calc(${blackKeyW}px / 2 + ${keysGap}px + 1px);
      border-right: none;
      border-radius: 0px 0px 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(
        100% -
          (${blackKeyW}px / 2 + ${keysGap}px + 1px - ${blackKeysOffset}px) -
          (${blackKeyW}px / 2 + ${keysGap}px + 1px)
      );
      left: calc(
        ${blackKeyW}px / 2 + ${keysGap}px + 1px - ${blackKeysOffset}px
      );
    }
    ${Note} {
      left: 50%;
    }
  `,
  A: css`
    justify-content: flex-start;
    &::after {
      left: calc(${keyBorderWidth} * -1px);
      width: calc(${blackKeyW}px / 2 + ${keysGap}px + 1px);
      border-left: none;
      border-radius: 0px 0px 6px 0;
    }
    &::before {
      right: calc(${keyBorderWidth} * -1px);
      width: calc(
        ${blackKeyW}px / 2 + ${keysGap}px + 1px - ${blackKeysOffset}px
      );
      border-right: none;
      border-radius: 0px 0px 0 6px;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(
        100% -
          (${blackKeyW}px / 2 + ${keysGap}px + 1px - ${blackKeysOffset}px) -
          (${blackKeyW}px / 2 + ${keysGap}px + 1px)
      );
      left: calc(${blackKeyW}px / 2 + ${keysGap}px + 1px);
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
      width: calc(
        ${blackKeyW}px / 2 + ${keysGap}px + 1px + ${blackKeysOffset}px
      );
      border-left: none;
      border-radius: 0px 0px 6px 0;
    }
    ${WhiteKeyJustifyContainer} {
      width: calc(100% - (${blackKeyW}px / 2 + 1px + ${blackKeysOffset}px));
    }
    ${Note} {
      left: 50%;
    }
  `,
};

const blackKeysStyles: Record<KeyShape, ReturnType<typeof css>> = {
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

const whiteKeyCommon = css`
  ${commonStyleForKeyBase};
  ${commonStyleForKey}
  position: relative;
  border-width: ${keyBorderWidth}px;
  border-style: solid;
  margin: 0 ${keysGap}px;
  border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
  height: 140px;
  &::after,
  &::before {
    content: "";
    display: block;
    height: calc(${blackKeyH}px + ${keysGap}px + 2px);
    border-radius: 0 0 ${instrumentElBRadius} ${instrumentElBRadius};
    position: absolute;
    background-color: var(--background);
    border-width: ${keyBorderWidth}px;
    border-style: solid;
    border-top: calc(${keyBorderWidth}px + 3px) solid var(--background); // +3px for better rednering of sides borders
    z-index: 1;
    top: -1px;
  }
`;

const blackKeyCommon = css`
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
    border-width: ${keyBorderWidth}px;
    border-style: solid;
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
  $isTuneNote: boolean;
}>`
  position: relative;

  ${({ $isActiveNote }) => {
    if ($isActiveNote) {
      return css`
        filter: brightness(2);
      `;
    }
    return null;
  }};

  ${({ $isTuneNote }) => {
    if ($isTuneNote) {
      return css`
        border-color: var(--secondary);
        box-shadow: inset 0 0px 2px 0px
          color-mix(in oklab, var(--secondary) 80%, var(--background));
        &::after,
        &::before {
          border-color: var(--secondary);
          box-shadow: inset 0 0px 2px 0px
            color-mix(in oklab, var(--secondary) 80%, var(--background));
        }
      `;
    }
    return css`
      border-color: ${borderColor};
      &::after,
      &::before {
        border-color: ${borderColor};
      }
    `;
  }};

  ${({ $isTuneKeyNote }) => {
    return $isTuneKeyNote
      ? css`
          &::after,
          &::before {
            /* border: ${borderColor} ${keyBorderWidth}px solid; */
          }
        `
      : "";
  }};

  ${({ $isWhitePianoKey }) =>
    $isWhitePianoKey ? whiteKeyCommon : blackKeyCommon}

  ${({ $pianoKeyShape }) => whiteKeyStyles[$pianoKeyShape]}

  ${({ $pianoKeyShape }) => blackKeysStyles[$pianoKeyShape]}


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
