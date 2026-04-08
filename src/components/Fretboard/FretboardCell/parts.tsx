import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts/constants";
import styled, { css, keyframes } from "styled-components";

const regularBgColor = `color-mix(in oklab, var(--accent) 10%, transparent)`;

const baseChordEntryAnimation = keyframes`
  from{
    height: 14px;
  }
  to{
    height: 1px;
  }
`;

const baseChordEntryAnimation2 = keyframes`
  from{
    transform: scale(1.2);
  }
  to{
    transform: scale(1);
  }
`;

export const FretWrapper = styled.div`
  position: relative;
  flex: 1 1 0;
  width: 0;
  height: 32px;
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
  $isBaseChordShapeNote: boolean;
  $isHighlighted: boolean;
  $animateBaseChordDown: boolean;
}>`
  background-color: ${regularBgColor};
  border-width: 1px;
  border-style: solid;
  border-color: color-mix(in oklab, var(--border) 55%, transparent);
  border-radius: ${instrumentElBRadius};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: box-shadow, opacity;
  opacity: ${({ $opacity }) => $opacity};
  overflow: hidden;
  position: relative;
  ${({ $isBaseChordShapeNote }) => {
    if (!$isBaseChordShapeNote) return null;
    const markupColor = `color-mix(in oklab, var(--foreground) 100%, transparent)`;
    const deg = 25;
    const space = 6;
    const size = 14;
    const layers = 2;

    return css`
      animation: ${baseChordEntryAnimation2} 0.2s ease-in-out forwards;
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
  ${({ $animateBaseChordDown }) => {
    if ($animateBaseChordDown) return null;
    return css`
      &::before,
      &::after {
        animation: ${baseChordEntryAnimation} 0.2s ease-out forwards;
      }
    `;
  }}
  
  ${({ $isHighlighted }) => {
    if ($isHighlighted) {
      return css`
        background-color: color-mix(in oklab, var(--accent) 50%, transparent);
        border-color: var(--secondary);
        box-shadow: inset 0 0px 8px 0px var(--accent);
        border-width: 3px;
      `;
    }
  }}
`;
