import styled, { css } from "styled-components";

export const BoardWrapper = styled.div`
  min-width: 1000px;
  margin: auto;
  overflow: hidden;
  padding-left: 5px; //- compensation for VariantProgressDots
`;

export const BoardScrollWrapper = styled.div`
  overflow-x: auto;
  position: relative;
  scrollbar-width: none;
  border-radius: var(--radius-lg);
  margin-left: -5px; //- compensation for VariantProgressDots
`;

export const TutorialStickyIcons = styled.div`
  position: sticky;
  left: 0;
  z-index: 100;
`;

export const KeyAndFretStyles = css`
  border: 1px solid var(--border);
`;
