import styled from "styled-components";

export const IconHoverSpin = styled.div`
  transition: transform 300ms ease-in-out;
  filter: drop-shadow(0 0 15px var(--background));
  &:hover {
    transform: rotate(360deg);
  }
`;
