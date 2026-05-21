import styled, { css } from "styled-components";
import { fretboardRPadding } from "../parts";
import { appBgColor } from "@/constants";

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
    ${appBgColor} 0%,
    color-mix(in oklab, var(--muted) 35%, var(--background)),
    ${appBgColor} 100%
  );
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
          font-weight: 600;
        `}
`;
