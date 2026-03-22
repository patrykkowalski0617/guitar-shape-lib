import styled from "styled-components";

export const ControlWrapper = styled.div`
  display: flex;
  gap: calc(var(--spacing) * 2);
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    & > * {
      flex: 1 1 calc(50% - (var(--spacing)));
    }
  }
`;
