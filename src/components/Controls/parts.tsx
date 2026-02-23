import styled from "styled-components";

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1300px;
  padding: 0 35px;

  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 1230px;
    margin: auto;
  }
`;

export const ControlSection = styled.div`
  height: 36px;
  display: flex;
  justify-content: center;
  gap: calc(var(--spacing) * 4);
  flex-direction: row;
  width: 100%;
  align-items: end;
  @media (min-width: 768px) {
    &:first-child {
      flex-grow: 1;
      width: auto;
    }

    &:last-child {
      flex-grow: 0;
      width: auto;
      flex-shrink: 0;
    }
  }
`;

export const ControlWrapper = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  position: relative;
  /* flex: 1 1 0; */
  @media (min-width: 1440px) {
    flex: 0 0 auto;
    width: auto;
    max-width: fit-content;
  }
`;
