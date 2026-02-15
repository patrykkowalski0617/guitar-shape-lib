import { css } from "styled-components";

export const activeDotsStyles = css`
  transform: translate(-50%, 0%) scale(1.5);
  background: color-mix(in oklab, var(--background) 90%, transparent);
  box-shadow: 0 0 8px 8px var(--background);
  color: var(--background);
  padding: 5px;
  --dot-active-scale: 1.15;
`;
