import styled, { css } from "styled-components";
import { middleBarButtons } from "../MiddleControlsBar/constants";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const AddBrickButton = styled.div<{
  $isDisabled: boolean;
}>`
  ${middleBarButtons}
  svg {
    transition: filter 0.1s ease-in-out;
    color: var(--secondary);
  }

  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          svg {
            color: var(--muted);
          }
          pointer-events: none;
        `
      : css`
          &:hover {
            svg {
              filter: drop-shadow(0px 0px 4px var(--secondary));
            }
          }
        `}
`;
