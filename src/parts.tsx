import styled, { css } from "styled-components";
import { transitionTime } from "@/store";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

export const MainContent = styled.main`
  padding: 0 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 25px;
  @media (min-width: 1024px) {
    padding-bottom: 50px;
  }
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
  width: 1400px;
  margin: auto;
  overflow: hidden;
  padding: 0 35px;
`;

export const InstrumentScrollWrapper = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  mask-image: linear-gradient(
    to right,
    transparent,
    var(--background) 45px,
    var(--background) calc(100% - 45px),
    transparent
  );
  position: relative;
  border-radius: var(--radius-lg);
  margin-left: -15px; //- compensation for VariantDots
  margin-right: -15px; //- compensation for VariantDots
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
    max-width: 1500px;
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

export const instrumentElBRadius = "4px";
export const instrumentBRadius = "var(--radius-lg)";
