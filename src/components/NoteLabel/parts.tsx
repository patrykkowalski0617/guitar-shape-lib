import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";
import { instrumentElBRadius } from "../Piano/PianoKey/parts/constants";

const unHighlightedColor = "var(--border)";

export const Note = styled.div`
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
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

  ${({ $variant }) =>
    $variant === "fretboard" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      ${Note} {
        background: transparent;
        color: var(--background);
        height: 100%;
        width: 100%;
        border-radius: 4px;
      }
    `}
`;
