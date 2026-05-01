import styled, { css } from "styled-components";

export const appBgColor = `color-mix(in oklab, var(--muted) 40%, var(--background))`;

export const insetShadow = css`
  box-shadow:
    3px 3px 4px 1px color-mix(in oklab, var(--background) 70%, transparent)
      inset,
    -1px -1px 1px 0px color-mix(in oklab, var(--foreground) 20%, transparent)
      inset,
    3px 3px 5px 0px color-mix(in oklab, var(--background) 50%, transparent),
    -1px -1px 7px 0px color-mix(in oklab, var(--foreground) 8%, transparent);
  background: linear-gradient(
    342deg,
    color-mix(in oklab, ${appBgColor} 85%, var(--background)) 0%,
    color-mix(in oklab, ${appBgColor} 65%, var(--background)) 100%
  );
`;

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: ${appBgColor};
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
  margin-bottom: 15px;
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
  margin: 0 -10px;
  margin-bottom: -10px;
  z-index: 2;
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
