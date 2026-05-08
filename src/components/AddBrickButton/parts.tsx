import styled from "styled-components";
import { middleBarButtons } from "../MiddleControlsBar/constants";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const AddBrickButton = styled.div<{
  $isDisabled: boolean;
}>`
  background: color-mix(in oklab, var(--secondary) 90%, var(--background));
  ${middleBarButtons}
`;
