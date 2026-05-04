import { glassEffectShadow } from "@/constants";
import { css } from "styled-components";

export const playerElementHeight = "30px";
export const playerElementWidth = "35px";
export const playerIconSize = 20;
export const playerElementCommon = css`
  ${glassEffectShadow}

  > svg {
    filter: drop-shadow(
      2px 2px 0px color-mix(in oklab, var(--background) 90%, transparent)
    );
  }
`;
