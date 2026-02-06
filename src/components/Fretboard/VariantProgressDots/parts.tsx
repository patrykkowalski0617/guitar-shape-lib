import styled, { css } from "styled-components";

export const DotsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 1px;
  left: 50%;
  top: -5px;
  transform: translateX(-50%);
  z-index: 30;
`;

export const Dot = styled.div<{
  $isLearned: boolean;
  $isActive: boolean;
}>`
  width: 7px;
  height: 9px;
  border-radius: 3px;
  position: relative;
  border: 1px solid color-mix(in oklab, var(--accent) 80%, transparent);
  background-color: ${({ $isLearned }) => {
    if ($isLearned) return "var(--accent)";
    return "var(--background)";
  }};
  border-color: ${({ $isLearned }) => {
    if ($isLearned) return "var(--background)";
    return "var(--accent)";
  }};
  filter: brightness(1.2);
  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: scale(1.3) translateY(-1px);
      z-index: 1;
    `}
  will-change: transform, background-color;
  transition:
    transform 0.1s ease-in-out,
    background-color 0.1s ease;
`;
