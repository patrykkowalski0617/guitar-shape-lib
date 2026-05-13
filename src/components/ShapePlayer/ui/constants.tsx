import { css } from "styled-components";

export const elementBase = css<{ $widthMultiplier?: number }>`
  ${({ $widthMultiplier = 1 }) => css`
    padding: 4px 8px;
    min-width: calc(40px * ${$widthMultiplier});
  `}
`;
