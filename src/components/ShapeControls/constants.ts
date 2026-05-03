import { css, keyframes } from "styled-components";

export const expandedListCommon = css`
  box-shadow: 15px 15px 20px 0px var(--background);
`;

export const opacityAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
