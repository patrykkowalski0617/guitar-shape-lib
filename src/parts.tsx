import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-around;
`;

export const MainContent = styled.main`
  padding: 0 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Setcion = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 25px auto 0;
  @media (max-width: 1000px) {
    margin-top: 10px;
  }
`;
