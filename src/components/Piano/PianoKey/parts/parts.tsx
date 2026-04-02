import styled, { css } from "styled-components";
import { getKeyHighlight } from "./getKeyHighlight";
import {
  borderColor,
  instrumentBRadius,
  instrumentElBRadius,
} from "./constants";
import {
  whiteKeyCommon,
  whiteKeyStyles,
  type WhiteKeyTypes,
} from "./whiteKeys";
import {
  blackKeyCommon,
  blackKeysStyles,
  type BlackKeyTypes,
} from "./blackKeys";

export const Key = styled.div<{
  $isShapeSelected: boolean;
  $isWhitePianoKey: boolean;
  $pianoKeyShape?: WhiteKeyTypes | BlackKeyTypes;
  $isHighlighted?: boolean;
  $isActiveNote: boolean;
  $isShapeNote: boolean;
  $isRoleNote: boolean;
  $isHighlight: boolean;
}>`
  position: relative;

  ${({ $isActiveNote }) =>
    $isActiveNote &&
    css`
      filter: brightness(2);
    `}

  ${({ $isHighlight, $pianoKeyShape }) =>
    getKeyHighlight({
      isHighlight: $isHighlight,
      pianoKeyShape: $pianoKeyShape,
      highlightColor: "var(--secondary)",
    })}

  ${({ $isWhitePianoKey }) =>
    $isWhitePianoKey ? whiteKeyCommon : blackKeyCommon}
  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && whiteKeyStyles[$pianoKeyShape as WhiteKeyTypes]}
  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && blackKeysStyles[$pianoKeyShape as BlackKeyTypes]}

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
