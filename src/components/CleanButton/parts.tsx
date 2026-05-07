import styled, { css } from "styled-components";
import { shapeExplorerCommon } from "../ShapeExplorer/constants";

export const Wrapper = styled.div<{
  $isDisabled: boolean;
}>`
  ${shapeExplorerCommon}
  position: relative;
  z-index: 10;
  width: 40px;
  transition: opacity 0.1s ease-in-out;
  svg {
    transition: filter 0.1s ease-in-out;
  }

  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          svg {
            filter: unset !important;
            opacity: 0.7;
            color: var(--muted);
          }
        `
      : css`
          svg {
            color: var(--instrument);
          }
          &:hover {
            svg {
              filter: drop-shadow(0px 0px 4px var(--instrument));
            }
          }
        `}
`;
