import styled, { css } from "styled-components";
import { transitionTime } from "./data/constants";

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
  padding: 15px;
`;

const SectionCommonCss = css`
  margin: 25px auto 0;
  @media (min-width: 1024px) {
    margin: 40px auto 0;
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

export const FooterAndHeaderStyles = css<{
  $isFullscreen: boolean;
}>`
  background-color: color-mix(in oklab, var(--accent) 65%, transparent);
  max-width: unset;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  transition:
    max-height ${transitionTime}ms 500ms ease-in-out,
    opacity ${transitionTime}ms 500ms ease-in-out;

  @media (min-width: 1600px) {
    max-width: 1400px;
  }

  @media (min-width: 768px) {
    ${({ $isFullscreen }) =>
      $isFullscreen &&
      css`
        flex-shrink: 1;
        max-height: 0;
        opacity: 0;
      `}
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
