import styled from "styled-components";
import { buttonsCommon } from "../constants";

export const Wrapper = styled.div<{ $isDisabled: boolean }>`
  svg {
    filter: drop-shadow(0px 0px 4px var(--warn));
  }
  &:hover {
    svg {
      filter: drop-shadow(0px 0px 0px var(--warn));
    }
  }
  ${buttonsCommon}
`;
