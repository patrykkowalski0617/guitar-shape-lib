import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts/constants";
import styled, { css, keyframes } from "styled-components";

const regularBgColor = `color-mix(in oklab, var(--accent) 10%, transparent)`;

const baseChordExitAnimation = keyframes`
  from{
    height: 10px;
  }
  to{
    height: 1px;
  }
`;

const baseChordEntryAnimation = keyframes`
  0%{
    transform: scale(1);
  }
  50%{
    transform: scale(1.3);
  }
  100%{
    transform: scale(1);
  }
`;

export const FretWrapper = styled.div`
  position: relative;
  flex: 1 1 0;
  width: 0;
  height: 28px;
  @media (min-width: 1024px) {
    height: 32px;
  }
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

export type Opacity = "max" | "min";

export const Note = styled.div<{
  $opacity: Opacity;
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
  opacity: ${({ $opacity }) =>
    $opacity === "max" ? 1 : $opacity === "min" ? "0" : "0.7"};
  overflow: hidden;
  position: relative;
  ${({ $isBaseChordShapeNote }) => {
    if (!$isBaseChordShapeNote) return null;
    const markupColor = `color-mix(in oklab, var(--primary) 100%, transparent)`;
    const deg = 25;
    const space = 6;
    const size = 14;
    const layers = 3;

    return css`
      animation: ${baseChordEntryAnimation} 0.3s linear forwards;
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
        animation: ${baseChordExitAnimation} 0.2s ease-out forwards;
      }
    `;
  }} 
    
  ${({ $isHighlighted }) => {
    if ($isHighlighted) {
      return css`
        background-color: color-mix(in oklab, var(--accent) 50%, transparent);
        border-color: var(--secondary);
        box-shadow: inset 0 0px 8px 0px var(--accent);
        @media (min-width: 1024px) {
          border-width: 3px;
        }
      `;
    }
  }}
`;
