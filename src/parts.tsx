import styled, { css } from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const SectionCommonCss = css`
  margin-bottom: 10px;
  @media (min-width: 1024px) {
    margin-bottom: 30px;
  }
`;

export const Section = styled.div`
  max-width: 1400px;
  width: 100%;
  ${SectionCommonCss}
`;

export const InstrumentWrapper = styled.div`
  margin: auto;
  overflow: hidden;
  width: 1400px;
`;

export const InstrumentScrollWrapper = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  position: relative;
  border-radius: var(--radius-lg);
  @media (max-width: 1400px) {
    mask-image: linear-gradient(
      to right,
      transparent,
      var(--background) 5px,
      var(--background) calc(100% - 5px),
      transparent
    );
  }
`;

export const ControlLabel = styled.span`
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted-foreground);
  margin-bottom: 8px;
  margin-left: 4px;
  line-height: 1;
  display: inline-block;
`;
