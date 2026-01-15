import styled, { css } from "styled-components";

export const BoardWrapper = styled.div`
  max-width: 1200px;
  min-width: 1000px;
  margin: auto;
  overflow: hidden;
`;

export const BoardsWrapper = styled.div`
  margin: 0 10px;
  overflow: auto;
`;

export const KeyAndFretStyles = css`
  border: 1px solid var(--border);
  box-shadow: inset 0 0px 3px 0px var(--input);
`;
