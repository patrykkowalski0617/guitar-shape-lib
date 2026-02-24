import styled from "styled-components";

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1300px;
  gap: calc(var(--spacing) * 4);
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: center;
    padding: 0 35px;
    max-width: 1230px;
    margin: auto;
  }
`;
export const ControlWrapper = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 0 0 calc(50% - (var(--spacing) * 2));

  @media (max-width: 767px) {
    &:last-child {
      flex: 0 0 auto;
      width: 70px;
    }

    &:nth-last-child(2) {
      flex: 1 1 0;
      width: auto;
    }
  }

  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: auto;
    max-width: fit-content;
  }
`;
