import styled from "styled-components";

export const ShapeExplorerWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 45;
  display: none;
  @media (min-width: 1400px) {
    display: block;
  }
`;

export const Tick = styled.div<{
  $isUserList: boolean;
  $isVisible: boolean;
}>`
  flex: 1 1 0;
  height: 100%;
  border: 1px solid;
`;
