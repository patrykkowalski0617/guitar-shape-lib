import styled from "styled-components";

export const MiddleControlsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MiddleSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-grow: 1;
`;

export const SideSections = styled.div`
  flex: 0 0 40%;
  display: flex;
  position: relative;

  &:first-child {
    top: -25px;
  }
  &:last-child {
    bottom: -25px;
  }
`;
