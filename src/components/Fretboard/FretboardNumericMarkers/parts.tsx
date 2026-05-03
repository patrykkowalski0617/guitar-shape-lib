import styled from "styled-components";
import { fretboardRPadding } from "../parts";

export const FretboardNumericMarkers = styled.div`
  margin-right: ${fretboardRPadding};
  margin-left: 55px;
  position: relative;
  z-index: 2;
  margin-bottom: 0px;
  @media (min-width: 1024px) {
    margin-bottom: 10px;
    margin-top: 3px;
  }
  border-radius: 20px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-image: linear-gradient(
    -90deg,
    color-mix(in oklab, var(--muted) 30%, var(--background)) 0%,
    color-mix(in oklab, var(--muted) 35%, var(--background)) 100%
  );
  box-shadow:
    -1px -1px 1px 0px color-mix(in oklab, var(--foreground) 6%, transparent),
    1px 1px 2px 0px color-mix(in oklab, var(--background) 80%, transparent);
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
