import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";
import { noteCommon } from "./constants";

export const Note = styled.div`
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  position: absolute;
  z-index: 40;
`;

export const NoteWrapper = styled.div<{
  $isVisible: boolean;
  $variant: Variant;
  $isSelected: boolean;
}>`
  ${({ $isVisible }) => css`
    opacity: ${$isVisible ? "1" : "0"};
    transition: opacity 0.1s ease-out;
  `}

  ${({ $variant }) =>
    $variant === "piano" &&
    css`
      position: relative;
      z-index: 40;
      ${Note} {
        ${noteCommon}
        top: 20px;
        transform: translateX(-50%);
        box-shadow: 1px 2px 3px 2px var(--background);
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
        ${noteCommon}
        box-shadow: 5px 3px 4px 1px
          color-mix(in oklab, var(--background) 70%, transparent);
        height: 25px;
        width: 25px;
        border-radius: 40px;
      }
    `}
`;
