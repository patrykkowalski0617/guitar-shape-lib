import { css } from "styled-components";

export const middleBarButtons = css`
  box-shadow:
    3px 3px 15px 3px color-mix(in oklab, var(--background) 65%, transparent),
    -3px -3px 15px 3px color-mix(in oklab, var(--foreground) 15%, transparent);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: opacity 0.4s ease-in-out;
`;
