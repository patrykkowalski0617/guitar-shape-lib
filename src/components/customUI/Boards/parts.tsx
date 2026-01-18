import styled, { css } from "styled-components";

export const BoardWrapper = styled.div`
  min-width: 1000px;
  margin: auto;
  overflow: hidden;
`;

export const BoardScrollWrapper = styled.div`
  overflow: auto;
  scrollbar-width: none;
  border-radius: var(--radius-lg);
  padding-bottom: 5px;
`;

export const KeyAndFretStyles = css`
  border: 1px solid var(--border);
`;
