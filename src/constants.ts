import { css } from "styled-components";

export const appBgColor = `var(--background)`;

export const insetShadow = css`
  box-shadow:
    3px 3px 6px 1px color-mix(in oklab, var(--background) 60%, transparent)
      inset,
    -1px -1px 1px 0px color-mix(in oklab, var(--foreground) 50%, transparent)
      inset,
    3px 3px 10px 2px color-mix(in oklab, var(--background) 80%, transparent),
    -1px -1px 10px 3px color-mix(in oklab, var(--foreground) 20%, transparent);
`;

export const outsideShadow = css`
  box-shadow:
    inset -1px -1px 1px 0px
      color-mix(in oklab, var(--background) 30%, transparent),
    0px 0px 2px 1px color-mix(in oklab, var(--foreground) 10%, transparent),
    -1px -1px 2px 1px color-mix(in oklab, var(--foreground) 10%, transparent),
    1px 1px 4px 1px color-mix(in oklab, var(--background) 100%, transparent),
    2px 2px 6px 1px color-mix(in oklab, var(--background) 100%, transparent);
`;

export const glassEffectShadow = css`
  box-shadow:
    1px 1px 4px 1px color-mix(in oklab, var(--background) 60%, transparent)
      inset,
    -1px -1px 3px 0px color-mix(in oklab, var(--foreground) 20%, transparent)
      inset;
`;

export const animationDuration = 400;
