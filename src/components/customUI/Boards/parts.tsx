import styled, { css } from "styled-components";

export const BoardWrapper = styled.div`
  max-width: 1200px;
  min-width: 1000px;
  margin: auto;
  overflow: hidden;
`;

export const BoardScrollWrapper = styled.div`
  overflow: auto;
  scrollbar-width: none;
`;

export const KeyAndFretStyles = css`
  border: 1px solid var(--border);
`;
