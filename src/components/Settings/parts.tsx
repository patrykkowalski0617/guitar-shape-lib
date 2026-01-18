import styled from "styled-components";

export const IconHoverSpin = styled.div`
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: rotate(360deg);
  }
`;
