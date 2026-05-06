import styled, { css } from "styled-components";
import { buttonsCommon } from "../constants";

export const Wrapper = styled.div<{
  $isDisabled: boolean;
}>`
  ${buttonsCommon}
  width: unset;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: filter 0.1s ease-in-out;
    color: var(--secondary);
  }

  &:hover {
    svg {
      filter: drop-shadow(0px 0px 4px var(--secondary));
    }
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.2;
      pointer-events: none;
    `}
`;
