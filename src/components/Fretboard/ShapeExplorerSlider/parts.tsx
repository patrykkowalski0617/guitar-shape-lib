import styled from "styled-components";

export const ShapeExplorerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
`;

export const Tick = styled.div<{
  $isUserList: boolean;
  $isHighlighted: boolean;
}>`
  flex: 1 1 0;
  height: 100%;
  border: 1px solid;
`;
