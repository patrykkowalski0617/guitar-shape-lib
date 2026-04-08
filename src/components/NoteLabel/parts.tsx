import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";
import { transitionTime } from "@/data/constants";
import { instrumentElBRadius } from "../Piano/PianoKey/parts/constants";

const highlightedColor = "var(--foreground)";
const unHighlightedColor = "var(--border)";

export const Note = styled.div`
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 0 8px var(--background);
  position: absolute;
  z-index: 40;
  background: color-mix(in oklab, var(--background) 95%, transparent);
`;

export const NoteWrapper = styled.div<{
  $isHighlighted: boolean;
  $variant: Variant;
}>`
  ${({ $variant, $isHighlighted }) =>
    $variant === "piano" &&
    css`
      position: relative;
      z-index: 40;
      opacity: ${$isHighlighted ? "1" : "0"};
      ${Note} {
        border-radius: ${instrumentElBRadius};
        width: 18px;
        height: 30px;
        line-height: 22px;
        color: ${unHighlightedColor};
        top: 10px;
        transform: translateX(-50%);
      }
    `}

  ${({ $variant, $isHighlighted }) =>
    $variant === "fretboard" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      ${Note} {
        color: ${$isHighlighted ? highlightedColor : unHighlightedColor};
        height: 15px;
        width: 30px;
        border-radius: 4px;
      }
    `}
`;
