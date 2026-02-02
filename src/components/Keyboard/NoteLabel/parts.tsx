import styled from "styled-components";
import {
  highlightedColor,
  LabelWrapperBase,
  MainLabel,
  OptionalLabel,
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
  flex-direction: column;

  will-change: top, opacity;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn
      ? `opacity ${transitionTime}ms ease-in-out, top ${transitionTime}ms ease-in-out`
      : "none"};
  top: ${({ $isShapeNote }) => ($isShapeNote ? "25px" : "0")};
  opacity: ${({ $isHighlighted, $isShapeNote }) => {
    return $isShapeNote || $isHighlighted ? "1" : "0";
  }};

  ${MainLabel}, ${OptionalLabel} {
    background: color-mix(in oklab, var(--background) 70%, transparent);
    box-shadow: 0 0 8px var(--background);
    border: 1px solid color-mix(in oklab, var(--accent) 70%, transparent);
    top: 0;
    color: ${highlightedColor};
  }
`;
