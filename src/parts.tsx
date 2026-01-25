import styled, { css } from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  padding: 0 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-height: 900px;
`;

export const SectionCommonCss = css`
  margin: 25px auto 0;
`;

export const Setcion = styled.div`
  max-width: 1200px;
  width: 100%;
  ${SectionCommonCss}
`;
