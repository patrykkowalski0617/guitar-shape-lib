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
  background-color: var(--primary);
  box-shadow: 0 0 6px var(--primary) inset;
  max-width: 1500px;
  margin: 0 auto;
  width: 100%;
`;

export const ControlContainer = styled.div`
  padding: 5px 27px 0;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: calc(var(--spacing) * 6) calc(var(--spacing) * 8);
  max-width: 600px;
  flex-direction: row;
  align-items: flex-end;
  @media (min-width: 1024px) {
    max-width: unset;
  }
`;

export const ControlWrapper = styled.div<{ $isFullWidth?: boolean }>`
  user-select: none;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 600px;
  flex: 1 1 40%;
  @media (min-width: 1024px) {
    ${({ $isFullWidth }) => (!$isFullWidth ? `max-width: fit-content` : "")}
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

export const instrumentElBRadius = "6px";
export const instrumentBRadius = "var(--radius-lg)";
