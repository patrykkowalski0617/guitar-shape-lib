import styled from "styled-components";
import { buttonsCommon } from "../constants";

export const Wrapper = styled.div<{
  $isDisabled: boolean;
  $isTemporarlyDisabled: boolean;
}>`
  &:hover {
    svg {
      filter: drop-shadow(0px 0px 4px var(--warn));
    }
  }
  ${buttonsCommon}
`;
