import styled from "styled-components";
import { getKeyHighlight } from "./getKeyHighlight";
import { instrumentBRadius, instrumentElBRadius } from "./constants";
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
  $isHighlighted: boolean;
  $isRoleNote: boolean;
}>`
  position: relative;

  ${({ $isHighlighted, $pianoKeyShape }) =>
    getKeyHighlight({
      isHighlighted: $isHighlighted,
      pianoKeyShape: $pianoKeyShape,
      highlightColor: "var(--secondary)",
    })}

  ${({ $isWhitePianoKey }) =>
    $isWhitePianoKey ? whiteKeyCommon : blackKeyCommon}
  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && whiteKeyStyles[$pianoKeyShape as WhiteKeyTypes]}
  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && blackKeysStyles[$pianoKeyShape as BlackKeyTypes]}



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
