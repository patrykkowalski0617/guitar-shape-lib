import styled, { keyframes } from "styled-components";

const opacityAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  opacity: 0;
  position: relative;
  z-index: 10;
  box-shadow:
    1px 1px 4px 1px color-mix(in oklab, var(--background) 90%, transparent)
      inset,
    -1px -1px 1px 0px color-mix(in oklab, var(--foreground) 25%, transparent)
      inset;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0 20px;
  animation: ${opacityAnimation} 0.3s 0.4s ease-in-out forwards;
  svg {
    filter: drop-shadow(0px 0px 4px var(--warn));
  }
  &:hover {
    svg {
      filter: drop-shadow(0px 0px 0px var(--warn));
      opacity: 0.9;
    }
  }

  svg {
    transition:
      filter 0.1s ease-in-out,
      opacity 0.1s ease-in-out;
  }
`;
