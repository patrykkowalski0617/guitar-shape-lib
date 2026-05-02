import styled, { keyframes } from "styled-components";
import { shapeExplorerCommon } from "../../constants";

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
  ${shapeExplorerCommon}
  width: 40px;
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
