import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";
import { noteCommon } from "./constants";

export const Note = styled.div<{
  $isVisible: boolean;
  $variant: Variant;
}>`
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  z-index: 40;
  position: relative;
  ${({ $isVisible }) => css`
    opacity: ${$isVisible ? "1" : "0"};
    transition: opacity 0.1s ease-out;
  `}

  ${({ $variant }) =>
    $variant === "fretboard" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      ${noteCommon}
      box-shadow: 5px 3px 4px 1px
          color-mix(in oklab, var(--background) 70%, transparent);
      height: 25px;
      width: 25px;
      border-radius: 40px;
    `}
    
  ${({ $variant }) =>
    $variant === "piano" &&
    css`
      z-index: 40;
      ${noteCommon}
      top: 20px;
      transform: translateX(-50%);
      box-shadow: 1px 2px 3px 2px var(--background);
    `}
`;

export const NoteWrapper = styled.div<{ $isTargetNote?: boolean }>`
  position: relative;
  border-radius: 40px;
  ${({ $isTargetNote }) =>
    $isTargetNote
      ? css`
          box-shadow: 0px 0px 8px 6px
            color-mix(in oklab, var(--warn) 80%, transparent);
          background-color: color-mix(in oklab, var(--warn) 80%, transparent);
        `
      : ""}
`;
