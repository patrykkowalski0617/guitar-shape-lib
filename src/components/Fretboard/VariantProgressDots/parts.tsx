import styled, { css } from "styled-components";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { activeDotsStyles } from "./constants";

export const DotsWrapper = styled(ToggleGroupPrimitive.Root)`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 4px;
  left: 50%;
  top: -4px;
  transform: translateX(-50%) scale(0.27);
  transform-origin: center top;
  z-index: 30;
  background-color: var(--background);
  padding: 6px 10px;
  border-radius: 24px;
  color: transparent;
  &:focus-within {
    ${activeDotsStyles}
  }
`;

export const Dot = styled.div<{
  $isActive: boolean;
  $isLearned: boolean;
}>`
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 900;
  line-height: 1;
  background-color: ${({ $isActive, $isLearned }) =>
    $isActive
      ? "var(--primary)"
      : $isLearned
        ? "var(--accent)"
        : "color-mix(in oklab, var(--muted) 70%, var(--foreground))"};
  border-radius: 50%;
  cursor: pointer;
  transition:
    transform 0.025s ease-in-out,
    background-color 0.2s ease;
  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: scale(1.1);
      z-index: 1;
      background-color: var(--primary);
    `}

  &:hover {
    filter: brightness(1.2);
  }
`;
