import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";
import { instrumentElBRadius } from "@/parts";
import { transitionTime } from "@/data/constants";

const highlightedColor = "var(--foreground)";
const unHighlightedColor = "var(--border)";

export const Note = styled.div`
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  will-change: opacity;
  background: color-mix(in oklab, var(--background) 70%, transparent);
  box-shadow: 0 0 8px var(--background);
  position: absolute;
`;

export const NoteWrapper = styled.div<{
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
      transition: ${!$isActiveNote
        ? `opacity ${transitionTime}ms ease-in-out`
        : "none"};
      opacity: ${$isShapeNote || $isActiveNote ? "1" : "0"};
      ${Note} {
        border: 1px solid color-mix(in oklab, var(--border) 90%, transparent);
        border-radius: ${instrumentElBRadius};
        background: color-mix(in oklab, var(--background) 90%, transparent);
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

      ${Note} {
        color: ${$isShapeNote ? highlightedColor : unHighlightedColor};
        height: 15px;
        width: 26px;
        border-radius: 4px;
      }
    `}
`;
