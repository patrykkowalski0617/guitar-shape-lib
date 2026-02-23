import styled from "styled-components";

export const ControlContainer = styled.div`
  padding: 5px 0;
  margin: auto;
  display: flex;
  gap: calc(var(--spacing) * 6) calc(var(--spacing) * 8);
  max-width: 700px;
  align-items: end;
  flex-wrap: wrap;
`;

export const ControlWrapper = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 1 0;
  @media (min-width: 1440px) {
    flex: 0 0 auto;
    width: auto;
    max-width: fit-content;
  }
`;
