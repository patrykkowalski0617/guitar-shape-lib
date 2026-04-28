import styled from "styled-components";
import { fretboardRPadding } from "../parts";

export const FretboardNumericMarkers = styled.div`
  margin-right: ${fretboardRPadding};
  margin-left: 55px;
  position: relative;
  z-index: 2;
  margin-bottom: 1px;
  margin-top: 3px;
  border-radius: 20px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-shadow:
    -1px -1px 1px 1px color-mix(in oklab, var(--foreground) 3%, transparent),
    1px 2px 3px 1px color-mix(in oklab, var(--background) 40%, transparent);
`;

export const Marker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  width: 100%;
  font-size: 12px;
  font-weight: 600;
  color: color-mix(in oklab, var(--foreground) 75%, var(--border));
  user-select: none;
  z-index: 30;
  &:first-child {
    display: none;
  }
`;
