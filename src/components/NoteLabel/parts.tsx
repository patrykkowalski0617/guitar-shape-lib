import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";
import { instrumentElBRadius } from "../Piano/PianoKey/parts/constants";

export const Note = styled.div`
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  position: absolute;
  z-index: 40;
  color: var(--background);
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
        width: 22px;
        height: 22px;
        line-height: 22px;
        top: 10px;
        transform: translateX(-50%);
        background-color: var(--foreground);
        box-shadow: 3px 3px 10px 3px var(--background);
        border: 1px solid var(--border);
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
        height: 100%;
        width: 100%;
        border-radius: 4px;
      }
    `}
`;
