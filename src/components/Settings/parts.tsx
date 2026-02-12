import styled from "styled-components";
import { ControlWrapper as ControlWrapperOrygin } from "@/parts";

export const IconHoverSpin = styled.div`
  transition: transform 300ms ease-in-out;
  filter: drop-shadow(0 0 15px var(--background));
  &:hover {
    transform: rotate(360deg);
  }
`;

export const ControlWrapper = styled(ControlWrapperOrygin)`
  width: auto;
  @media (min-width: 1024px) {
    max-width: unset;
  }
`;
