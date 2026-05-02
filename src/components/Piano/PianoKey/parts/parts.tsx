import styled from "styled-components";
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
  blackKeysWrapperStyles,
  blackKeyWrapperCommon,
} from "./blackKeys";
import type { BlackKeyTypes, KeyTypes, WhiteKeyTypes } from "../../constants";
import { getKeyPushEffect } from "./getKeyPushEffect";

export const Key = styled.div<{
  $isShapeSelected: boolean;
  $isWhitePianoKey: boolean;
  $pianoKeyShape?: KeyTypes;
  $isPushed: boolean;
}>`
  position: relative;
  ${({ $isWhitePianoKey }) =>
    $isWhitePianoKey ? whiteKeyCommon : blackKeyCommon}
  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && whiteKeyStyles[$pianoKeyShape as WhiteKeyTypes]}
  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && blackKeysStyles[$pianoKeyShape as BlackKeyTypes]}
  ${({ $isPushed, $pianoKeyShape }) =>
    getKeyPushEffect({
      isPushed: $isPushed,
      pianoKeyShape: $pianoKeyShape,
    })}
`;

export const KeyWrapper = styled.div<{
  $isWhitePianoKey: boolean;
  $pianoKeyShape?: KeyTypes;
}>`
  flex: 1 1 0;
  position: relative;
  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && whiteKeyWrapperStyles[$pianoKeyShape as WhiteKeyTypes]}

  ${({ $pianoKeyShape }) =>
    $pianoKeyShape && blackKeysWrapperStyles[$pianoKeyShape as BlackKeyTypes]}

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
