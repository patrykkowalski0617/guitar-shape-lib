import styled from "styled-components";

export const iconSize = 20;

export const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1300px;
  gap: calc(var(--spacing) * 4);
  margin-bottom: 20px;
  @media (min-width: 768px) {
    padding: 0 35px;
  }
`;

export const ControlContainerSection = styled.div`
  display: flex;
  width: fit-content;
  gap: calc(var(--spacing) * 4);
  flex-direction: row;
`;

export const ControlWrapper = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  position: relative;
`;
