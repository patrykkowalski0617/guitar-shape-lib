import { insetShadow } from "@/constants";
import styled, { css } from "styled-components";

export const Tick = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--primary) 0%, var(--muted) 100%);
  box-shadow: 2px 2px 8px 2px var(--background);
  z-index: 3;
  pointer-events: none;
`;

export const SliderRoot = styled.div<{ $isVertical?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  user-select: none;
  ${({ $isVertical }) =>
    $isVertical
      ? css`
          height: 100%;
          width: 32px;
        `
      : css`
          width: 100%;
          height: 32px;
        `}
`;

export const SliderTrack = styled.div<{
  $isVertical?: boolean;
  $thumbSize?: number;
}>`
  position: relative;
  background-color: color-mix(in oklab, var(--background) 50%, transparent);
  border-radius: 9999px;
  z-index: 2;
  ${insetShadow}
  ${({ $isVertical, $thumbSize = 28 }) =>
    $isVertical
      ? css`
          width: 5px;
          height: calc(100% - ${$thumbSize}px);
        `
      : css`
          height: 5px;
          width: calc(100% - ${$thumbSize}px);
        `}
`;

export const ThumbVisual = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 1px solid var(--primary);
  box-shadow:
    2px 2px 8px 2px var(--background),
    0px 0px 2px 1px var(--border) inset,
    0px 0px 3px 2px var(--contrast) inset;
  z-index: 1;
`;

export const InteractionContainer = styled.div<{
  $isVertical: boolean;
  $thumbSize: number;
}>`
  position: absolute;
  z-index: 2;

  ${({ $isVertical, $thumbSize }) =>
    $isVertical
      ? css`
          left: 0;
          right: 0;
          top: ${$thumbSize / 2}px;
          bottom: ${$thumbSize / 2}px;
        `
      : css`
          top: 0;
          bottom: 0;
          left: ${$thumbSize / 2}px;
          right: ${$thumbSize / 2}px;
        `}
`;

export const InteractionZone = styled.div<{
  $isVertical: boolean;
  $thumbSize: number;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $thumbSize }) => $thumbSize + 40}px;
  height: ${({ $thumbSize }) => $thumbSize + 20}px;

  &:hover > div {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const ControlsWrapper = styled.div<{
  $isVertical: boolean;
  $thumbSize: number;
}>`
  position: absolute;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;

  ${({ $isVertical }) =>
    $isVertical
      ? css`
          right: 0;
          flex-direction: column-reverse;
        `
      : css`
          top: 0;
          flex-direction: row;
        `}
`;

export const CutButton = styled.button`
  all: unset;
  width: 20px;
  height: 20px;
  background: var(--background);
  border: 1px solid var(--primary);
  border-radius: 4px;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  &:hover:not(:disabled) {
    background: var(--primary);
    color: var(--background);
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const SliderThumb = styled.div<{ $isVertical: boolean }>`
  position: absolute;
  cursor: grab;
  z-index: 10;
  &:active {
    cursor: grabbing;
  }
`;
