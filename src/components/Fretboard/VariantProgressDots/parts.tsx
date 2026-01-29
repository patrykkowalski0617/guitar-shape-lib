import styled, { css } from "styled-components";

export const DotsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 1px;
  left: 50%;
  top: -4px;
  transform: translateX(-50%);
  z-index: 30;
`;

export const Dot = styled.div<{
  $isLearned: boolean;
  $isActive: boolean;
}>`
  width: 6px;
  height: 8px;
  border-radius: 2px;
  border: 1px solid var(--muted-foreground);
  background-color: ${({ $isLearned }) => {
    if ($isLearned) return "var(--accent)";
    return "var(--background)";
  }};
  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: scale(1.4) translateY(-1px);
    `}
  will-change: transform, background-color;
  transition:
    transform 0.1s ease-in-out,
    background-color 0.1s ease;
`;
