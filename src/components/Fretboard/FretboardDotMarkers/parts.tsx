import styled, { css } from "styled-components";

export const Marker = styled.div<{
  $singleDot?: boolean;
  $doubleDot?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25px;
  font-size: 12px;
  font-weight: 800;
  color: var(--border);
  user-select: none;
  z-index: 20;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 12px;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border: 1px solid var(--background);
    border-radius: 50%;
    background-color: var(--primary);
    display: none;
    box-shadow:
      0 0 8px 0 var(--primary),
      0 0 4px 0 var(--primary);
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
        transform: translate(-7px, -50%);
      }
      &::after {
        display: block;
        transform: translate(7px, -50%);
      }
    `}
`;
