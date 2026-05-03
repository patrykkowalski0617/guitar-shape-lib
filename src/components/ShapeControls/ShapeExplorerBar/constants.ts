import { insetShadow } from "@/constants";
import { css } from "styled-components";

export const shapeExplorerCommon = css`
  ${insetShadow}
  height: 40px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

export const buttonsCommon = css<{
  $isDisabled: boolean;
  $isTemporarlyDisabled?: boolean;
}>`
  ${shapeExplorerCommon}
  position: relative;
  z-index: 10;
  width: 40px;
  transition: opacity 0.1s ease-in-out;
  svg {
    transition: filter 0.1s ease-in-out;
  }
  ${({ $isTemporarlyDisabled }) =>
    $isTemporarlyDisabled
      ? css`
          opacity: 0;
          width: 0;
        `
      : ""}
  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          svg {
            filter: unset !important;
            opacity: 0.6;
          }
        `
      : ""}
`;
