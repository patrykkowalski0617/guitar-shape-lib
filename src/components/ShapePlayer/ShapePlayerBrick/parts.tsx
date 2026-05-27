import { color, space } from "@/components/ui";
import styled, { css } from "styled-components";

export const ShapePlayerBrickWrapper = styled.div<{ $isActiveBrick: boolean }>`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${space._3};
  height: 70px;
  border-bottom: 1px transparent solid;

  ${({ $isActiveBrick }) =>
    $isActiveBrick &&
    css`
      border-bottom: 1px ${color.secondary} solid;
    `}
`;
