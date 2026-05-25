import styled, { css } from "styled-components";
import type { Variant } from "./NoteLabel";
import { noteCommon } from "./constants";

const glowEffect = css`
  background: #c5301c;
  filter: brightness(1.11) saturate(1.28)
    drop-shadow(0px 0px 2px rgb(234, 69, 44))
    drop-shadow(0px 0px 2px rgba(200, 48, 28, 0.4));
  height: 31px;
  width: 31px;
  padding: 3px;
`;

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
      color-mix(in oklab, var(--background) 60%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -1px 2px rgba(0, 0, 0, 0.22);
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
    `};
`;

export const NoteWrapper = styled.div<{ $isTargetNote?: boolean }>`
  position: relative;
  border-radius: 40px;
  ${({ $isTargetNote }) =>
    $isTargetNote
      ? css`
          ${glowEffect}
        `
      : ""}
`;
