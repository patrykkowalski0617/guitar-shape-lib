import styled, { css } from "styled-components";

export const DotsWrapper = styled.div`
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
  transition: transform 0.1s ease-in-out;
  color: transparent;
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
  filter: brightness(1.2);
  transition:
    transform 0.1s ease-in-out,
    background-color 0.1s ease,
    filter 0.1s;
  will-change: transform, filter;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: scale(1.2);
      z-index: 1;
      filter: brightness(2);
    `}
`;
