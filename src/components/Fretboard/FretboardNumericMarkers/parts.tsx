import styled from "styled-components";
import { fretboardRPadding } from "../parts";
import { appBgColor } from "@/constants";

export const FretboardNumericMarkers = styled.div`
  margin-right: ${fretboardRPadding};
  margin-left: 55px;
  position: relative;
  z-index: 2;
  margin-bottom: 0px;
  opacity: 0.6;
  border-radius: 20px;
  height: 22px;
  margin-bottom: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-image: linear-gradient(
    -90deg,
    ${appBgColor} 0%,
    color-mix(in oklab, var(--muted) 30%, var(--background)),
    ${appBgColor} 100%
  );
`;

export const Marker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  width: 100%;
  font-size: 10px;
  font-weight: 600;
  color: color-mix(in oklab, var(--foreground) 75%, var(--border));
  user-select: none;
  z-index: 30;
  &:first-child {
    display: none;
  }
`;
