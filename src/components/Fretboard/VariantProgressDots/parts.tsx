import styled, { css } from "styled-components";

export const DotsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 3px;
  left: 50%;
  top: -5px;
  transform: translateX(-50%) scale(0.33);
  transform-origin: center top;
  z-index: 30;
  background-color: var(--background);
  padding: 6px 9px;
  border-radius: 18px;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: translateX(-50%) scale(1);
  }
`;

export const Dot = styled.div<{
  $isLearned: boolean;
  $isActive: boolean;
}>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: relative;
  background-color: ${({ $isLearned }) => ($isLearned ? "var(--primary)" : "var(--accent)")};

  filter: brightness(1.2);
  transition:
    transform 0.1s ease-in-out,
    background-color 0.1s ease,
    filter 0.1s;
  will-change: transform, filter;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: scale(1.3);
      z-index: 1;
      filter: brightness(2);
    `}
`;
