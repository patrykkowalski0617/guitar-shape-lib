import styled, { css } from "styled-components";

export const DotsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1px;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
`;

export const Dot = styled.div<{
  $isLearned: boolean;
  $isActive: boolean;
}>`
  width: 10px;
  min-height: 9px;
  border-radius: 2px;
  border: 1px solid var(--accent-foreground);
  opacity: 0.8;
  background-color: ${({ $isLearned }) => {
    if ($isLearned) return "var(--secondary)";
    return "var(--card)";
  }};
  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: scale(1.25);
      opacity: 1;
    `}
  will-change: transform, background-color;
  transition:
    transform 0.1s ease-in-out,
    background-color 0.2s ease;
`;
