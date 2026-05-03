import styled, { css } from "styled-components";
import { appBgColor } from "./constants";

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
export const Section = styled.div<{ $isDisabled?: boolean }>`
  max-width: 1400px;
  width: 100%;
  interpolate-size: allow-keywords;
  padding: 10px 0;
  margin-top: -20px;
  display: flex;
  gap: 16px;
  justify-content: center;
  > * {
    flex: 1 1 0;
  }
  ${({ $isDisabled }) =>
    $isDisabled !== undefined
      ? css`
          overflow: hidden;
          height: 0;
          opacity: 0;
          transition:
            height 0.4s ease-in-out,
            opacity 0.2s 0.2s ease-in-out;

          ${!$isDisabled &&
          css`
            height: auto;
            opacity: 1;
            ${SectionCommonCss};
          `}
        `
      : css`
          height: auto;
          ${SectionCommonCss};
        `}
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
