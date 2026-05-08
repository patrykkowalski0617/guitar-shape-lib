import { glassEffectShadow } from "@/constants";
import { css } from "styled-components";

export const playerElementHeight = "33px";
export const playerElementWidth = "40px";
export const playerIconSize = 20;
export const playerTextShadow = css`
  text-shadow: 1px 1px 0px
    color-mix(in oklab, var(--background) 70%, transparent);
`;

export const playerElementCommon = css`
  ${glassEffectShadow}
  height: ${playerElementHeight};
  ${playerTextShadow}
`;
export const playerButtonCommon = css`
  width: ${playerElementWidth};
  font-size: 16px;
  font-weight: 900;
  position: relative;
  color: var(--background);
  > svg {
    filter: drop-shadow(
      1px 2px 0px color-mix(in oklab, var(--background) 80%, transparent)
    );
  }
`;
