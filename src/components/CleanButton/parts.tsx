import styled, { css } from "styled-components";
import { middleBarButtons } from "../MiddleControlsBar/constants";

export const Wrapper = styled.div<{
  $isDisabled: boolean;
}>`
  ${middleBarButtons}
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
