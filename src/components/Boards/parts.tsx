import styled, { css } from "styled-components";

export const BoardWrapper = styled.div`
  min-width: 1200px;
  margin: auto;
  overflow: hidden;
  padding: 0 10px;
`;

export const BoardScrollWrapper = styled.div`
  overflow-x: auto;
  position: relative;
  scrollbar-width: none;
  mask-image: linear-gradient(
    to right,
    transparent,
    var(--background) 15px,
    var(--background) calc(100% - 15px),
    transparent
  );
  border-radius: var(--radius-lg);
  margin-left: -5px; //- compensation for VariantProgressDots
`;

export const TutorialStickyIcons = styled.div`
  position: sticky;
  left: 0;
  z-index: 40;
`;

export const KeyAndFretStyles = css`
  border: 1px solid var(--border);
`;
