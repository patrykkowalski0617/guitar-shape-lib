import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";
import { noteCommon } from "./constants";

const glowEffect = css`
  background: #c5301c;
  filter: brightness(1.11) saturate(1.28);
  height: 31px;
  width: 31px;
  padding: 3px;
`;

export const Note = styled.div<{
  $isVisible: boolean;
  $variant: Variant;
  $isTargetNote?: boolean;
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
  `}
  ${({ $variant, $isTargetNote }) =>
    $variant === "fretboard" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      ${noteCommon}
      height: 25px;
      width: 25px;
      border-radius: 40px;
      ${!$isTargetNote
        ? css`
            box-shadow:
              5px 3px 4px 1px
                color-mix(in oklab, hsl(0, 0%, 2%) 60%, transparent),
              inset 0 1px 0 rgba(255, 255, 255, 0.35),
              inset 0 -1px 2px rgba(0, 0, 0, 0.22);
          `
        : ""}
    `}

  ${({ $variant }) =>
    $variant === "piano" &&
    css`
      z-index: 40;
      ${noteCommon}
      top: 20px;
      transform: translateX(-50%);
      box-shadow: 1px 2px 3px 2px hsl(0, 0%, 2%);
    `};
`;

export const NoteWrapper = styled.div<{ $isTargetNote?: boolean }>`
  position: relative;
  border-radius: 40px;
  ${({ $isTargetNote }) =>
    $isTargetNote
      ? css`
          ${glowEffect}
          box-shadow:
              5px 3px 4px 1px
                color-mix(in oklab, hsl(0, 0%, 2%) 60%, transparent),
              inset 0 0px 0 rgba(255, 255, 255, 0.35),
              inset 0 -1px 2px rgba(0, 0, 0, 0.22);
        `
      : ""}
`;
