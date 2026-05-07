import styled from "styled-components";

export const MiddleControlsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SideSections = styled.div`
  width: 43%;
  display: flex;
  position: relative;

  &:first-child {
    top: -25px;
  }
  &:last-child {
    bottom: -25px;
  }
`;
