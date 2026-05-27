import { space } from "@/components/ui";
import { appBgColor } from "@/constants";
import styled, { css } from "styled-components";

export const ShapePlayerBrickWrapper = styled.div<{ $isActiveBrick: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${space._3};
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
