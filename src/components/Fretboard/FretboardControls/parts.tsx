import styled from "styled-components";

export const ControlContainer = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 4);
  justify-content: flex-end;
  max-width: 1300px;
  margin-bottom: 10px;
  @media (min-width: 768px) {
    padding: 0 35px;
  }
`;

export const ControlWrapper = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  position: relative;
`;
