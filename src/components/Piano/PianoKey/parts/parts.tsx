import styled from "styled-components";
import { getKeyHighlight } from "./getKeyHighlight";
import { instrumentBRadius, instrumentElBRadius } from "./constants";
import {
  whiteKeyCommon,
  whiteKeyStyles,
  whiteKeyWrapperStyles,
  whiteWrapperKeyCommon,
} from "./whiteKeys";
import {
  blackKeyCommon,
  blackKeysStyles,
  blackKeyWrapperCommon,
} from "./blackKeys";
import type { BlackKeyTypes, KeyTypes, WhiteKeyTypes } from "../../constants";

export const Key = styled.div<{
  $isShapeSelected: boolean;
  $isWhitePianoKey: boolean;
  $pianoKeyShape?: KeyTypes;
  $isHighlighted: boolean;
  $isRoleNote: boolean;
}>`
  position: relative;

  ${({ $isHighlighted, $pianoKeyShape }) =>
    getKeyHighlight({
      isHighlighted: $isHighlighted,
      pianoKeyShape: $pianoKeyShape,
    })}

  ${({ $isWhitePianoKey }) =>
    $isWhitePianoKey ? whiteKeyCommon : blackKeyCommon}
  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && whiteKeyStyles[$pianoKeyShape as WhiteKeyTypes]}
  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && blackKeysStyles[$pianoKeyShape as BlackKeyTypes]}
`;

export const KeyWrapper = styled.div<{
  $isWhitePianoKey: boolean;
  $pianoKeyShape?: KeyTypes;
}>`
  flex: 1 1 0;

  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && whiteKeyWrapperStyles[$pianoKeyShape as WhiteKeyTypes]}

  ${({ $isWhitePianoKey }) =>
    $isWhitePianoKey ? whiteWrapperKeyCommon : blackKeyWrapperCommon}
  &:first-child ${Key} {
    border-radius: ${instrumentBRadius} 0 ${instrumentElBRadius}
      ${instrumentElBRadius};
    &::before,
    &::after {
      display: none;
    }
  }
  &:last-child ${Key} {
    border-radius: 0 ${instrumentBRadius} ${instrumentElBRadius}
      ${instrumentElBRadius};
  }
`;
