import { appBgColor } from "@/parts";
import { css, keyframes } from "styled-components";

export const shapeExplorerCommon = css`
  box-shadow:
    1px 1px 4px 1px color-mix(in oklab, var(--background) 90%, transparent)
      inset,
    -1px -1px 1px 0px color-mix(in oklab, var(--foreground) 25%, transparent)
      inset;
  height: 40px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: color-mix(in oklab, ${appBgColor} 85%, var(--background));
`;

export const opacityAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
