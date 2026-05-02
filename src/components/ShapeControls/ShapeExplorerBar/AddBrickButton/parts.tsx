import styled from "styled-components";
import { opacityAnimation, shapeExplorerCommon } from "../../constants";

export const Wrapper = styled.div`
  opacity: 0;
  position: relative;
  z-index: 10;
  ${shapeExplorerCommon}
  width: 40px;
  animation: ${opacityAnimation} 0.3s 0.4s ease-in-out forwards;
  svg {
    filter: drop-shadow(0px 0px 4px var(--secondary));
  }
  &:hover {
    svg {
      filter: drop-shadow(0px 0px 0px var(--secondary));
      opacity: 0.9;
    }
  }

  svg {
    transition:
      filter 0.1s ease-in-out,
      opacity 0.1s ease-in-out;
  }
`;
