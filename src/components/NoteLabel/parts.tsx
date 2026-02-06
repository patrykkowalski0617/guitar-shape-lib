import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";
import { instrumentElBRadius } from "@/parts";

export const highlightedColor = "var(--muted-foreground)";
export const unHighlightedColor = "var(--muted)";

const BaseLabel = styled.div<{
  $areAnimationsOn: boolean;
  $isHighlighted: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  will-change: opacity;
  transition: ${({ $areAnimationsOn }) => ($areAnimationsOn ? `opacity ${transitionTime}ms ease-in-out` : "none")};
  background: color-mix(in oklab, var(--background) 70%, transparent);
  box-shadow: 0 0 8px var(--background);
  position: absolute;
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

export const NoteWrapper = styled.div<{
  $isFlatTune: boolean;
  $isEnharmonicNote: boolean;
  $isShapeNote: boolean;
  $isTuneNote: boolean;
  $areAnimationsOn: boolean;
  $variant: Variant;
}>`
  ${({ $variant, $areAnimationsOn, $isShapeNote }) =>
    $variant === "piano" &&
    css`
      position: relative;
      z-index: 1;
      will-change: opacity;
      transition: ${$areAnimationsOn ? `opacity 100ms ease-in-out` : "none"};
      opacity: ${$isShapeNote ? "1" : "0"};
      ${MainLabel}, ${OptionalLabel} {
        border: 1px solid color-mix(in oklab, var(--accent) 70%, transparent);
        border-radius: ${instrumentElBRadius};
        width: 22px;
        height: 22px;
        line-height: 22px;
        color: ${highlightedColor};
        top: 0;
        transform: translateX(-50%);
      }
    `}

  ${({ $variant, $areAnimationsOn, $isShapeNote, $isTuneNote }) =>
    $variant === "fretboard" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      will-change: opacity;
      transition: ${$areAnimationsOn ? `opacity ${transitionTime}ms ease-in-out` : "none"};
      opacity: ${$isShapeNote || $isTuneNote ? "1" : "0"};

      ${MainLabel}, ${OptionalLabel} {
        color: ${$isShapeNote ? highlightedColor : unHighlightedColor};
        height: 15px;
        width: 26px;
        border-radius: 4px;
      }
    `}
`;
