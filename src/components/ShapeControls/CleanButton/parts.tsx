import styled from "styled-components";

export const Wrapper = styled.div<{ $isVisible: boolean }>`
  transition: 0.2s opacity;
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  background-color: var(--background);
  position: relative;
  z-index: 10;
  &:hover {
    svg {
      filter: drop-shadow(0px 0px 4px var(--primary));
      opacity: 0.9;
    }
  }

  svg {
    transition:
      filter 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
  }
`;
