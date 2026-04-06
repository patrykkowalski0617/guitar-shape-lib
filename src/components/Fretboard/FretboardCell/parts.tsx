import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts/constants";
import styled, { css } from "styled-components";

export const FretWrapper = styled.div`
  position: relative;
  flex: 1 1 0;
  width: 0;
  height: 30px;
  padding: 2px;
`;

export const Fret = styled.div<{
  $isLockedNote: boolean;
}>`
  height: 100%;
  border-radius: ${instrumentElBRadius};
  ${({ $isLockedNote }) => {
    if (!$isLockedNote) return null;

    return css`
      outline: 2px solid var(--secondary-foreground);
      padding: 2px;
    `;
  }}
`;

export const Note = styled.div<{
  $opacity: number;
  $brightness: number;
  $isShapeNote: boolean;
  $isBaseChordShapeNote: boolean;
}>`
  background-color: color-mix(in oklab, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in oklab, var(--border) 55%, transparent);
  border-radius: ${instrumentElBRadius};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: box-shadow, opacity;
  opacity: ${({ $opacity }) => $opacity};
  filter: ${({ $brightness }) =>
    $brightness > 1 ? `brightness(${$brightness})` : "none"};
  border-width: ${({ $isShapeNote }) => ($isShapeNote ? "3px" : "1px")};
  overflow: hidden;
  position: relative;
  ${({ $isBaseChordShapeNote }) => {
    if (!$isBaseChordShapeNote) return null;
    const markupColor = `color-mix(in oklab, var(--foreground) 100%, transparent)`;
    const deg = 30;
    const space = 4;
    const size = 1;
    const layers = 3;

    return css`
      &::before,
      &::after {
        content: "";
        height: ${size}px;
        width: 65px;
        background: ${markupColor};
        position: absolute;
        z-index: 30;
        box-shadow: ${Array.from({ length: layers })
          .map(
            (_, i) => `
            0px ${space * i}px 0px ${markupColor},
            0px -${space * i}px 0px ${markupColor}`,
          )
          .join(", ")};
      }
      &::before {
        transform: rotate(${deg}deg);
      }
      &::after {
        transform: rotate(-${deg}deg);
      }
    `;
  }}

  ${({ $isShapeNote }) => {
    if ($isShapeNote) {
      return css`
        background-color: color-mix(in oklab, var(--accent) 50%, transparent);
        border-color: var(--secondary);
        box-shadow: inset 0 0px 8px 0px var(--accent);
      `;
    }
  }}
`;
