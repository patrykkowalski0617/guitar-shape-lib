import { glassEffectShadow } from "@/constants";
import { css } from "styled-components";

export const playerElementHeight = "33px";
export const playerElementWidth = "42px";
export const playerIconSize = 20;
export const playerTextShadow = css`
  text-shadow: 1px 1px 0px
    color-mix(in oklab, var(--background) 70%, transparent);
`;

export const playerElementCommon = css`
  ${glassEffectShadow}
  height: ${playerElementHeight};
  padding: 0 10px;
  ${playerTextShadow}
  > svg {
    filter: drop-shadow(
      1px 2px 0px color-mix(in oklab, var(--background) 80%, transparent)
    );
  }
`;
