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
  margin-bottom: 13px;
  @media (min-width: 1024px) {
    margin-bottom: 50px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`;
export const Section = styled.div<{ $isDisabled?: boolean }>`
  max-width: 1400px;
  width: 100%;
  interpolate-size: allow-keywords;

  ${({ $isDisabled }) =>
    $isDisabled !== undefined
      ? css`
          padding-top: 20px;
          margin-top: -20px;
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

export const Label = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: color-mix(in oklab, var(--foreground) 20%, var(--primary));
  text-align: center;
  font-size: 12px;
`;
