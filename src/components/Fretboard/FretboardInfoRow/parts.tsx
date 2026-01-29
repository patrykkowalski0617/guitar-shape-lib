import styled, { css } from "styled-components";

export const FretInfoCell = styled.div<{
  $singleDot?: boolean;
  $doubleDot?: boolean;
  $isNumeric: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  margin: 0 2px;
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--border);
  opacity: 0.8;
  user-select: none;
  ${({ $isNumeric }) =>
    !$isNumeric &&
    css`
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border: 1px solid var(--background);
        border-radius: 50%;
        background-color: var(--primary);
        display: none;
        box-shadow: 0 0 8px var(--primary);
      }
    `}
  ${({ $isNumeric, $singleDot }) =>
    !$isNumeric &&
    $singleDot &&
    css`
      &::before {
        display: block;
      }
    `}

  ${({ $isNumeric, $doubleDot }) =>
    !$isNumeric &&
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
