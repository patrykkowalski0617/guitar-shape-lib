import { insetShadow } from "@/parts";
import { css, keyframes } from "styled-components";

export const shapeExplorerCommon = css`
  ${insetShadow}
  height: 40px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const opacityAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
