import styled from "styled-components";
import { middleBarButtons } from "../MiddleControlsBar/constants";

export const Wrapper = styled.div<{
  $isDisabled: boolean;
}>`
  background: color-mix(in oklab, var(--warn) 80%, var(--background));
  ${middleBarButtons}
`;
