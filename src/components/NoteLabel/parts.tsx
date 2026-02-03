import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";

export const highlightedColor = "var(--muted-foreground)";
export const unHighlightedColor = "var(--muted)";

const BaseLabel = styled.div<{
  $areAnimationsOn: boolean;
  $isHighlighted: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  line-height: 25px;
  border-radius: 100%;
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  will-change: opacity;
  transition: ${({ $areAnimationsOn }) =>
    $areAnimationsOn ? `opacity ${transitionTime}ms ease-in-out` : "none"};
`;

interface LabelStatusProps {
  $isEnharmonicNote: boolean;
  $isFlatTune: boolean;
}

export const MainLabel = styled(BaseLabel)<LabelStatusProps>`
  opacity: ${({ $isEnharmonicNote, $isFlatTune }) => (!$isEnharmonicNote || !$isFlatTune ? 1 : 0)};
`;

export const OptionalLabel = styled(BaseLabel)<LabelStatusProps>`
  opacity: ${({ $isFlatTune }) => ($isFlatTune ? 1 : 0)};
`;

export const Wrapper = styled.div<{
  $isFlatTune: boolean;
  $isEnharmonicNote: boolean;
  $isHighlighted: boolean;
  $isShapeNote: boolean;
  $isTuneNote: boolean;
  $areAnimationsOn: boolean;
  $variant: Variant;
}>`
  ${({ $variant, $areAnimationsOn, $isShapeNote, $isHighlighted }) =>
    $variant === "piano" &&
    css`
      position: relative;
      z-index: 1;

      will-change: top, opacity;
      transition: ${$areAnimationsOn
        ? `opacity ${transitionTime}ms ease-in-out, top ${transitionTime}ms ease-in-out`
        : "none"};

      top: ${$isShapeNote ? "25px" : "0"};
      opacity: ${$isShapeNote || $isHighlighted ? "1" : "0"};

      ${MainLabel}, ${OptionalLabel} {
        background: color-mix(in oklab, var(--background) 70%, transparent);
        border: 1px solid color-mix(in oklab, var(--accent) 70%, transparent);
        box-shadow: 0 0 8px var(--background);
        top: 0;
        color: ${highlightedColor};
      }
    `}

  ${({ $variant, $areAnimationsOn, $isShapeNote, $isTuneNote }) =>
    $variant === "fretboard" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      height: 20px;
      width: 30px;

      will-change: opacity;
      transition: ${$areAnimationsOn ? `opacity ${transitionTime}ms ease-in-out` : "none"};
      opacity: ${$isShapeNote || $isTuneNote ? "1" : "0"};

      ${MainLabel}, ${OptionalLabel} {
        color: ${$isShapeNote ? highlightedColor : unHighlightedColor};
      }
    `}
`;
