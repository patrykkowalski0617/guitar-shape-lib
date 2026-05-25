import styled, { css } from "styled-components";

export const ShapePlayerBrickWrapper = styled.div<{
  $isActiveBrick: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 4px;
  border: 1px solid transparent;
  ${({ $isActiveBrick }) =>
    $isActiveBrick &&
    css`
      border: 1px solid #c5301c;
      box-shadow:
        0px 0px 4px rgb(234, 69, 44),
        0px 0px 7px rgba(200, 48, 28, 0.4);
    `}
`;
