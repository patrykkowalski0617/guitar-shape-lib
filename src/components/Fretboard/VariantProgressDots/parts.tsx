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
  background-color: var(--background);
  padding: 2px 3px;
  border-radius: 6px;
  &:hover {
    transform: scale(3);
  }
`;

export const Dot = styled.div<{
  $isLearned: boolean;
  $isActive: boolean;
}>`
  width: 5px;
  height: 5px;
  border-radius: 6px;
  position: relative;
  background-color: ${({ $isLearned }) => {
    if ($isLearned) return "var(--primary)";
    return "var(--accent)";
  }};

  filter: brightness(1.2);
  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: scale(1.3);
      z-index: 1;
      filter: brightness(2);
    `}
  will-change: transform, background-color;
  transition:
    transform 0.1s ease-in-out,
    background-color 0.1s ease;
`;
