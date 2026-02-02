import styled from "styled-components";
import {
  highlightedColor,
  LabelWrapperBase,
  MainLabel,
  OptionalLabel,
  unHighlightedColor,
} from "@/components/NoteLabel/parts";
import { transitionTime } from "@/utils/constants";

interface StyledNoteLabelProps {
  $isFlatTune: boolean;
  $isEnharmonicNote: boolean;
  $isHighlighted: boolean;
  $isShapeNote: boolean;
  $isTuneNote: boolean;
  $areAnimationsOn: boolean;
}

export const Wrapper = styled.div<StyledNoteLabelProps>`
  ${LabelWrapperBase}
  flex-direction: row;
  height: 20px;
  width: 30px;

  will-change: opacity;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn ? `opacity ${transitionTime}ms ease-in-out` : "none"};
  opacity: ${({ $isTuneNote, $isShapeNote }) => {
    return $isShapeNote || $isTuneNote ? "1" : "0";
  }};

  ${MainLabel}, ${OptionalLabel} {
    color: ${({ $isShapeNote }) => ($isShapeNote ? highlightedColor : unHighlightedColor)};
  }
`;
