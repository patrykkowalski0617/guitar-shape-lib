import styled from "styled-components";
import { buttonsCommon } from "../constants";

export const Wrapper = styled.div<{
  $isDisabled: boolean;
  $isTemporarlyDisabled: boolean;
}>`
  svg {
    transition: filter 0.1s ease-in-out;
  }
  &:hover {
    svg {
      filter: drop-shadow(0px 0px 4px var(--secondary));
    }
  }
  ${buttonsCommon}
`;
