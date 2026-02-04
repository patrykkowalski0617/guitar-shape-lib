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
  @media (min-width: 1000px) {
    max-height: 900px;
  }
`;

export const SectionCommonCss = css`
  margin: 25px auto 0;
`;

export const Setcion = styled.div`
  max-width: 1300px;
  width: 100%;
  ${SectionCommonCss}
`;

export const InstrumentWrapper = styled.div`
  width: 1300px;
  margin: auto;
  overflow: hidden;
  padding: 0 10px;
`;

export const InstrumentScrollWrapper = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  mask-image: linear-gradient(
    to right,
    transparent,
    var(--background) 15px,
    var(--background) calc(100% - 15px),
    transparent
  );
  position: relative;
  border-radius: var(--radius-lg);
  margin-left: -5px; //- compensation for VariantProgressDots
`;

export const TutorialStickyIcons = styled.div`
  position: sticky;
  left: 0;
  z-index: 40;
`;

export const PianoKeyAndFretStyles = css`
  border: 1px solid var(--border);
`;

export const FooterAndHeaderStyles = css`
  background-color: color-mix(in oklab, var(--primary) 90%, #333);
  max-width: 1500px;
  margin: 0 auto;
  width: 100%;
`;
