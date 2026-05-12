import styled from "styled-components";

export const ShapePlayerLayout = styled.div``;

export const ShapePlayerHeaderWrapper = styled.div`
  display: flex;
`;

export const ShapePlayerActionButton = styled.button`
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ShapePlayerBricksList = styled.div`
  display: flex;
  flex-direction: column;
`;
