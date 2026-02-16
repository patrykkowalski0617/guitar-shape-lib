import { css } from "styled-components";

export const activeDotsStyles = css`
  transform: translate(-50%, 50%) scale(1.5);
  background: color-mix(in oklab, var(--background) 90%, transparent);
  box-shadow: 0 0 4px 4px var(--background);
  color: var(--background);
  padding: 2px;
  --dot-active-scale: 1.1;
`;
