import styled from "styled-components";

export const ShapePlayerBrickWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

export const ShapePlayerBrickDragHandle = styled.button`
  &:active {
    cursor: grabbing;
  }
`;

export const ShapePlayerBrickLabel = styled.span``;

export const ShapePlayerBrickDeleteButton = styled.button`
  color: #cc0000;
`;
