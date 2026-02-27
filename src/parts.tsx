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

export const SectionCommonCss = css`
  margin: 25px auto 0;
  @media (min-width: 1024px) {
    margin: 50px auto 0;
  }
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

export const FooterAndHeaderStyles = css<{ $isFullscreen: boolean; $isPianoVisable: boolean }>`
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

  ${({ $isFullscreen, $isPianoVisable }) =>
    $isFullscreen &&
    $isPianoVisable &&
    css`
      flex-shrink: 1;
      max-height: 0;
      opacity: 0;
    `}
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

export const CollapsibleSectionTransitionTime = 400;

export const CollapsibleSection = styled(Setcion)<{ $isVisible: boolean }>`
  ${SectionCommonCss}
  transition:
    opacity ${CollapsibleSectionTransitionTime}ms ease-in-out,
    transform ${CollapsibleSectionTransitionTime}ms ease-in-out,
    max-height ${CollapsibleSectionTransitionTime}ms ease-in-out,
    margin ${CollapsibleSectionTransitionTime}ms ease-in-out;
  overflow: hidden;
  will-change: transform, opacity, max-height;
  ${({ $isVisible }) =>
    $isVisible
      ? css`
          opacity: 1;
          transform: translateY(0) scale(1);
          max-height: 180px;
        `
      : css`
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          max-height: 0;
          margin-top: 0;
        `}
`;
