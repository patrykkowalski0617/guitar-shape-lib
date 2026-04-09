import styled from "styled-components";

export const ShapeExplorerWrapper = styled.div`
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  height: 30px;
  z-index: 30;
`;

export const Tick = styled.div<{
  $isUserList: boolean;
  $isHighlighted: boolean;
}>`
  flex: 1 1 0;
  height: 100%;
  border: 1px solid;
`;
