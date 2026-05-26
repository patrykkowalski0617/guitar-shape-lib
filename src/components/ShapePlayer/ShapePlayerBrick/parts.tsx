import { appBgColor } from "@/constants";
import styled, { css } from "styled-components";

export const ShapePlayerBrickWrapper = styled.div<{ $isActiveBrick: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  gap: 4px;
  ${({ $isActiveBrick }) =>
    $isActiveBrick &&
    css`
      background-image: linear-gradient(
        180deg,
        transparent 0%,
        color-mix(in oklab, ${appBgColor} 90%, var(--background)) 100%
      );
    `}
`;
