import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  padding: 0 10px;
  flex-grow: 1;
`;

export const Setcion = styled.div`
  margin-top: 40px;
  @media (max-width: 1000px) {
    margin-top: 10px;
  }
`;
