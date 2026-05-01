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
  $isVisible: boolean;
  $variant: Variant;
}>`
  ${({ $variant, $isVisible }) =>
    $variant === "piano" &&
    css`
      position: relative;
      z-index: 40;
      opacity: ${$isVisible ? "1" : "0"};
      transform: ${$isVisible ? "scale(1)" : "scale(1.1)"};
      transition:
        opacity 0.1s ease-out,
        transform 0.1s ease-out;
      ${Note} {
        border-radius: ${instrumentElBRadius};
        width: 22px;
        height: 22px;
        line-height: 22px;
        top: 10px;
        transform: translateX(-50%);
        background-color: var(--foreground);
        box-shadow: 1px 2px 3px 2px var(--background);
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
