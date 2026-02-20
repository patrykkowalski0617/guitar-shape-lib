import styled, { css } from "styled-components";
import { transitionTime } from "./data";

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
  justify-content: center;
  align-items: center;
`;

export const SectionCommonCss = css`
  margin: 50px auto 0;
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
  margin-left: -15px; //- compensation for VariantProgressDots
  margin-right: -15px; //- compensation for VariantProgressDots
`;

export const TutorialStickyIcons = styled.div`
  position: sticky;
  left: 0;
  z-index: 40;
`;

export const FooterAndHeaderStyles = css`
  background-color: color-mix(in oklab, var(--accent) 70%, transparent);
  max-width: 1500px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition:
    max-height ${transitionTime}ms 1000ms ease-in-out,
    opacity ${transitionTime}ms 1000ms ease-in-out;
`;

export const ControlContainer = styled.div`
  padding: 5px 27px 0;
  margin: auto;
  display: grid;
  gap: calc(var(--spacing) * 6) calc(var(--spacing) * 8);
  max-width: 700px;
  align-items: end;
  grid-template-columns: repeat(4, 1fr);

  & > *:nth-child(1),
  & > *:nth-child(2) {
    grid-column: span 2;
  }

  & > *:nth-child(3) {
    grid-column: span 4;
  }

  & > *:nth-child(n + 4) {
    grid-column: span 1;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(12, 1fr);

    & > *:nth-child(-n + 3) {
      grid-column: span 4;
    }

    & > *:nth-child(n + 4) {
      grid-column: span 3;
    }
  }

  @media (min-width: 1440px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: unset;
  }
`;

export const ControlWrapper = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (min-width: 1440px) {
    flex: 0 0 auto;
    width: auto;
    max-width: fit-content;
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

export const CollapsibleSection = styled(Setcion)<{ $isVisible: boolean }>`
  ${SectionCommonCss}
  transition:
    opacity 0.4s ease-in-out,
    transform 0.4s ease-in-out,
    max-height 0.4s ease-in-out,
    margin 0.4s ease-in-out;
  overflow: hidden;
  will-change: transform, opacity, max-height;

  ${({ $isVisible }) =>
    $isVisible
      ? css`
          opacity: 1;
          transform: translateY(0) scale(1);
          max-height: 200px;
          pointer-events: auto;
        `
      : css`
          opacity: 0;
          transform: translateY(20px) scale(0.98);
          max-height: 0;
          margin-top: 0;
          pointer-events: none;
        `}
`;
