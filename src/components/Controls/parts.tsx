import styled from "styled-components";

export const iconSize = 20;

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1300px;
  gap: calc(var(--spacing) * 6);
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end;
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
  flex: 0 0 calc(50% - (var(--spacing) * 6));

  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: auto;
    max-width: fit-content;
  }
`;
