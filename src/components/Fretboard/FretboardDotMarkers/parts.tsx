import styled, { css } from "styled-components";
import { fretboardRPadding } from "../parts";

export const FretboardDotMarkers = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-100%);
  padding-right: ${fretboardRPadding};
  display: flex;
  flex-direction: row;
`;

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
  transform: translateY(50%);
  font-size: 12px;
  font-weight: 800;
  color: var(--border);
  &::before,
  &::after {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--primary);
    box-shadow:
      0 0 3px 0 var(--background) inset,
      0 0 1px 0 var(--background) inset;
  }
  ${({ $singleDot }) =>
    $singleDot &&
    css`
      &::before {
        content: "";
      }
    `}

  ${({ $doubleDot }) =>
    $doubleDot &&
    css`
      &::before {
        content: "";
        transform: translateY(-24px);
      }
      &::after {
        content: "";
        transform: translateY(24px);
      }
    `}
`;
