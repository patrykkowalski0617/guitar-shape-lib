import styled, { css } from "styled-components";
import { buttonsCommon } from "../constants";

export const Wrapper = styled.div<{
  $isDisabled: boolean;
}>`
  ${buttonsCommon}

  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: var(--warn);
  }

  &:hover {
    svg {
      filter: drop-shadow(0px 0px 4px var(--warn));
      color: var(--warn);
    }
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.2;
      pointer-events: none;
    `}
`;
