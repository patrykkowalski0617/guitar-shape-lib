import styled, { css } from "styled-components";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { activeDotsStyles } from "./constants";

export const DotsWrapper = styled(ToggleGroupPrimitive.Root)`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 4px;
  left: 50%;
  top: -5px;
  transform: translateX(-50%) scale(0.25);
  transform-origin: center top;
  z-index: 30;
  background-color: var(--background);
  padding: 8px 12px;
  border-radius: 24px;
  transition: transform 0.025s ease-in-out;
  color: transparent;
  &:focus-within {
    ${activeDotsStyles}
  }
`;

export const Dot = styled.div<{
  $isLearned: boolean;
  $isActive: boolean;
}>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  line-height: 1;
  font-weight: bold;
  background-color: ${({ $isLearned }) => ($isLearned ? "var(--primary)" : "var(--accent)")};
  cursor: pointer;
  transition:
    transform 0.1s ease-in-out,
    background-color 0.3s ease,
    filter 0.1s;
  ${({ $isActive, $isLearned }) =>
    $isActive &&
    css`
      transform: scale(1.2);
      z-index: 1;
      ${$isLearned ? "background-color: color-mix(in oklab, var(--primary) 60%, #fff);" : "filter: brightness(2);"};
    `}
  &:hover {
    ${({ $isLearned }) =>
      $isLearned ? "background-color: color-mix(in oklab, var(--primary) 60%, #fff);" : "filter: brightness(2);"};
  }
`;
