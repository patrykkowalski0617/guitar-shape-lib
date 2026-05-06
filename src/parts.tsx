import styled, { css } from "styled-components";
import { appBgColor } from "./constants";
import {
  instrumentBRadius,
  instrumentElBRadius,
} from "./components/Piano/PianoKey/parts/constants";

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
  padding: 13px 0;
  @media (min-width: 1024px) {
    padding: 25px 0;
    &:last-child {
      padding-bottom: 0px;
    }
  }
`;

export const Section = styled.div<{ $isDisabled?: boolean }>`
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
  z-index: 2;
  border-radius: ${instrumentBRadius} ${instrumentBRadius}
    ${instrumentElBRadius} ${instrumentElBRadius};

  @media (max-width: 1400px) {
    mask-image: linear-gradient(
      to right,
      transparent,
      var(--background) 10px,
      var(--background) calc(100% - 10px),
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

export const Label = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: color-mix(in oklab, var(--foreground) 20%, var(--primary));
  text-align: center;
  font-size: 12px;
`;
