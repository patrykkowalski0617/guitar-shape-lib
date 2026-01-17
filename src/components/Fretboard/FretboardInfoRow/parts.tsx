import styled, { css } from "styled-components";

export const FretInfoCell = styled.div<{ $singleDot?: boolean; $doubleDot?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  padding-top: 4px;
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--border);
  opacity: 0.8;
  user-select: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    bottom: 8px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--primary);
    display: none;
  }

  ${({ $singleDot }) =>
    $singleDot &&
    css`
      &::before {
        display: block;
      }
    `}

  ${({ $doubleDot }) =>
    $doubleDot &&
    css`
      &::before {
        display: block;
        transform: translateX(-5px);
      }
      &::after {
        display: block;
        transform: translateX(5px);
      }
    `}
`;
