import { transitionTime } from "@/utils/constants";
import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";
import { instrumentElBRadius } from "@/parts";

export const highlightedColor = "var(--muted-foreground)";
export const unHighlightedColor = "var(--muted)";

const BaseLabel = styled.div<{
  $isHighlighted: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  will-change: opacity;
  transition: opacity ${transitionTime}ms ease-in-out;
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
  $isActiveNote: boolean;
  $variant: Variant;
}>`
  ${({ $variant, $isShapeNote, $isActiveNote }) =>
    $variant === "piano" &&
    css`
      position: relative;
      z-index: 1;
      will-change: opacity;
      transition: ${!$isActiveNote ? `opacity ${transitionTime}ms ease-in-out` : "none"};
      opacity: ${$isShapeNote || $isActiveNote ? "1" : "0"};
      ${MainLabel}, ${OptionalLabel} {
        border: 1px solid color-mix(in oklab, var(--accent) 70%, transparent);
        border-radius: ${instrumentElBRadius};
        width: 22px;
        height: 22px;
        line-height: 22px;
        color: ${highlightedColor};
        top: 10px;
        transform: translateX(-50%);
      }
    `}

  ${({ $variant, $isShapeNote }) =>
    $variant === "fretboard" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      will-change: opacity;
      transition: opacity ${transitionTime}ms ease-in-out;

      ${MainLabel}, ${OptionalLabel} {
        color: ${$isShapeNote ? highlightedColor : unHighlightedColor};
        height: 15px;
        width: 26px;
        border-radius: 4px;
      }
    `}
`;
