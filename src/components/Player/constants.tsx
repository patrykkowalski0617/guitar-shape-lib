import { css } from "styled-components";

export const playerElementHeight = "30px";
export const playerElementWidth = "35px";
export const playerIconSize = 20;
export const playerElementCommon = css`
  box-shadow:
    3px 3px 4px 1px color-mix(in oklab, var(--background) 80%, transparent),
    1px 1px 4px 1px color-mix(in oklab, var(--background) 70%, transparent)
      inset,
    -1px -1px 3px 0px color-mix(in oklab, var(--foreground) 20%, transparent)
      inset;
`;
