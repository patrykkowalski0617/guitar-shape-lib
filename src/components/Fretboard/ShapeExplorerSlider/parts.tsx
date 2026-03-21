import styled from "styled-components";

export const ShapeExplorerWrapper = styled.div`
  position: absolute;
  inset: 0;
`;

export const Tick = styled.div<{
  $isUserList: boolean;
  $isHighlighted: boolean;
}>`
  /* transform: translateX(-50%); */
  flex: 1 1 0;
  height: 100%;
  border: 1px solid;
`;
