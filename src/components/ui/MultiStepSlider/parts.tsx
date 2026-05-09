import { insetShadow } from "@/constants";
import * as SliderPrimitive from "@radix-ui/react-slider";
import styled, { css, keyframes } from "styled-components";

interface StyledProps {
  $isVertical?: boolean;
  $thumbSize?: number;
}

// ... Twoje animacje (highlightAnimation, tickOpacity) bez zmian ...
const highlightAnimation = keyframes`
 0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 0px transparent; }
 50% { transform: translate(-50%, -50%) scale(1.2); box-shadow: 0 0 8px 4px var(--secondary); }
 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 0px transparent; }
`;

const tickOpacity = keyframes`
 0% { opacity: 0; }
 100% { opacity: 1; }
`;

export const Tick = styled.div<{
  $isVisible?: boolean;
  $isOpacityAnimationLocked?: boolean;
  $opacityAnimationDuration?: number;
}>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent) 0%, var(--muted) 100%);
  box-shadow: 2px 2px 8px 2px var(--background);
  ${({ $isVisible, $isOpacityAnimationLocked, $opacityAnimationDuration }) => {
    if (!$opacityAnimationDuration) return;
    if ($isVisible)
      return css`
        animation: ${highlightAnimation} 0.6s ease-in-out forwards;
        z-index: 10;
      `;
    if (!$isOpacityAnimationLocked)
      return css`
        opacity: 0;
        animation: ${tickOpacity} ${$opacityAnimationDuration}ms
          ${$opacityAnimationDuration}ms forwards;
      `;
  }}
`;

export const SliderRoot = styled(SliderPrimitive.Root)<StyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  touch-action: none;
  user-select: none;
  ${({ $isVertical }) =>
    $isVertical
      ? css`
          flex-direction: column;
          height: 100%;
          width: 32px;
        `
      : css`
          flex-direction: row;
          width: 100%;
          height: 32px;
        `}
`;

export const SliderTrack = styled(SliderPrimitive.Track)<StyledProps>`
  position: relative;
  flex-grow: 1;
  background-color: color-mix(in oklab, var(--background) 50%, transparent);
  border-radius: 9999px;
  ${insetShadow}
  ${({ $isVertical, $thumbSize = 28 }) =>
    $isVertical
      ? css`
          width: 5px;
          height: 100%;
          margin: ${$thumbSize / 2}px 0;
        `
      : css`
          height: 5px;
          width: 100%;
          margin: 0 ${$thumbSize / 2}px;
        `}
`;

// Nowe elementy sterujące
export const ControlsWrapper = styled.div<StyledProps>`
  position: absolute;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;

  ${({ $isVertical, $thumbSize = 28 }) =>
    $isVertical
      ? css`
          flex-direction: column;
          left: ${$thumbSize + 8}px;
          top: 30%;
          transform: translateY(-50%);
        `
      : css`
          flex-direction: row;
          bottom: ${$thumbSize + 8}px;
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
        `}
`;

export const CutButton = styled.button`
  all: unset;
  width: 20px;
  height: 20px;
  background: var(--background);
  border: 1px solid var(--accent);
  border-radius: 4px;
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  pointer-events: auto;

  &:hover {
    background: var(--accent);
    color: var(--background);
  }
`;

// prettier-ignore
export const SliderThumb = styled(SliderPrimitive.Thumb)<
 StyledProps & { disabled?: boolean }>`
 display: block;
 border-radius: 9999px;
 border: 1px solid var(--accent);
 cursor: grab;
 transition: 0.2s;
 width: ${({ $thumbSize }) => $thumbSize}px;
 height: ${({ $thumbSize }) => $thumbSize}px;
 position: relative; /* Ważne dla ControlsWrapper */

 box-shadow:
  2px 2px 8px 2px var(--background),
  0px 0px 2px 1px var(--border) inset,
  0px 0px 3px 2px var(--contrast) inset;

 &:active {
  cursor: grabbing;
 }
 &:hover {
  transform: scale(1.1);
  ${ControlsWrapper} {
   opacity: 1;
  }
 }
 &:focus {
  outline: none;
 }
 &:focus-visible {
  box-shadow:
   2px 2px 8px 2px var(--background),
   0px 0px 2px 1px var(--border) inset,
   0px 0px 3px 2px var(--contrast) inset,
   0 0 0 2px color-mix(in oklab, var(--accent) 70%, transparent);
 }

 &[data-disabled] {
  border-color: var(--border);
  transform: scale(1);
  cursor: default;
  filter: grayscale(100%);
  background-color: #444;
 }
`;
