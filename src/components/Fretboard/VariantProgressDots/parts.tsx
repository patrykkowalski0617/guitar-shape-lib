import styled, { css } from "styled-components";

export const DotsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1px;
  left: -7px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
`;

export const Dot = styled.div<{
  $isLearned: boolean;
  $isLearning: boolean;
  $isActive: boolean;
}>`
  border-radius: 2px;
  width: 15px;
  min-height: 9px;
  background-color: var(--card);
  opacity: 0.8;
  border: 1px solid var(--accent-foreground);
  ${({ $isLearned }) =>
    $isLearned &&
    css`
      background-color: var(--secondary);
    `}

  ${({ $isLearning }) =>
    $isLearning &&
    css`
      background-color: var(--primary);
    `}
  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: scale(1.25);
    `}
`;
