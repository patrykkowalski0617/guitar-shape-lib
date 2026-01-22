import styled, { css } from "styled-components";

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

export const SectionCommonCss = css`
  margin-top: 15px;
  @media (min-width: 768px) {
    margin: 25px auto 0;
  }
`;

export const Setcion = styled.div`
  max-width: 1200px;
  width: 100%;
  padding-top: 5px;
  border-top: 1px solid var(--card);
  ${SectionCommonCss}
`;
