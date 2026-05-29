import { color, space } from "@/components/ui";
import styled, { css } from "styled-components";

export const ShapePlayerBrickWrapper = styled.div<{ $isActiveBrick: boolean }>`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: ${space._3};
  height: 70px;
  border-bottom: 1px transparent solid;
  position: relative;
  ${({ $isActiveBrick }) =>
    $isActiveBrick &&
    css`
      border-bottom: 1px ${color.secondary} solid;
    `}
`;

export const RangeArmedWrapper = styled.div`
  min-width: 30px;
  display: flex;
  justify-content: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: ${space._3};
`;
