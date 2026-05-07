import styled from "styled-components";
import { buttonsCommon } from "../constants";

export const Wrapper = styled.div<{
  $isDisabled: boolean;
}>`
  ${buttonsCommon}

  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: var(--instrument);
  }

  &:hover {
    svg {
      filter: drop-shadow(0px 0px 4px var(--instrument));
      color: var(--instrument);
    }
  }
`;
