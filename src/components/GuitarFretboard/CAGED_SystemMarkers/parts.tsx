import styled, { css, keyframes } from "styled-components";
import { fretboardRPadding } from "../parts";
import { appBgColor } from "@/constants";
import { apearingTransition } from "@/components/ui/constants";

const glowPulse = keyframes`
  0% {
    filter: brightness(1.11) saturate(1.28)
      drop-shadow(0px 2px 3px rgb(255, 34, 0))
      drop-shadow(0px 1px 4px rgba(200, 48, 28, 0.4));
  }
  100% {
    filter: brightness(1) saturate(0) drop-shadow(0px 0px 0px transparent)
      drop-shadow(0px 0px 0px transparent);
  }
`;

export const CAGED_SystemMarkers = styled.div`
  padding-right: ${fretboardRPadding};
  position: relative;
  border-radius: 20px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: calc(1400px - 50px);
  background-image: linear-gradient(
    -90deg,
    transparent 0%,
    color-mix(in oklab, var(--muted) 40%, var(--background)) 15%,
    color-mix(in oklab, var(--muted) 40%, var(--background)) 85%,
    transparent 100%
  );
  box-shadow: 0 0 8px 3px ${appBgColor} inset;
  transition: opacity ${apearingTransition};
`;

export const Marker = styled.div<{ $isBestMatch: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  width: 100%;
  font-size: 15px;
  color: var(--foreground);
  user-select: none;
  z-index: 30;
  ${({ $isBestMatch }) =>
    !$isBestMatch
      ? css`
          opacity: 0.5;
          font-weight: 400;
        `
      : css`
          animation: ${glowPulse} 6s forwards;
          font-weight: 600;
        `}
`;
