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
  max-width: 250px;
`;

export const SideSections = styled.div`
  flex: 0 0 38%;
  display: flex;
  position: relative;

  &:first-child {
    top: -20px;
  }
  &:last-child {
    bottom: -20px;
  }
`;
