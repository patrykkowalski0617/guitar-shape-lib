import { insetShadow } from "@/constants";
import styled, { css } from "styled-components";

export const SliderRoot = styled.div<{ $isVertical: boolean }>`
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
  $isVertical: boolean;
  $thumbSize: number;
}>`
  position: relative;
  background-color: color-mix(in oklab, var(--background) 50%, transparent);
  border-radius: 9999px;
  z-index: 2;
  ${insetShadow}
  ${({ $isVertical, $thumbSize }) =>
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

export const Tick = styled.div.attrs<{
  $tickPos: number;
  $isVertical: boolean;
}>(({ $tickPos, $isVertical }) => ({
  style: {
    bottom: $isVertical ? `${$tickPos}%` : "50%",
    left: $isVertical ? "50%" : `${$tickPos}%`,
    transform: $isVertical ? "translate(-50%, 50%)" : "translate(-50%, -50%)",
    top: $isVertical ? "" : "50%",
  },
}))<{ $tickPos: number; $isVertical: boolean }>`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--primary) 0%, var(--muted) 100%);
  box-shadow: 2px 2px 8px 2px var(--background);
  z-index: 3;
  pointer-events: none;
`;

export const SliderThumb = styled.div.attrs<{
  $isVertical: boolean;
  $startPos: number;
  $totalWidth: number;
  $thumbSize: number;
}>(({ $isVertical, $startPos, $totalWidth, $thumbSize }) => ({
  style: {
    bottom: $isVertical ? `calc(${$startPos}% - ${$thumbSize / 2}px)` : "auto",
    height: $isVertical
      ? `calc(${$totalWidth}% + ${$thumbSize}px)`
      : `${$thumbSize}px`,
    width: $isVertical
      ? `${$thumbSize}px`
      : `calc(${$totalWidth}% + ${$thumbSize}px)`,
    left: $isVertical ? "50%" : `calc(${$startPos}% - ${$thumbSize / 2}px)`,
    top: $isVertical ? "auto" : "50%",
    transform: $isVertical ? "translateX(-50%)" : "translateY(-50%)",
  },
}))<{
  $isVertical: boolean;
  $startPos: number;
  $totalWidth: number;
  $thumbSize: number;
  $isPreview?: boolean;
}>`
  position: absolute;
  cursor: ${({ $isPreview }) => ($isPreview ? "default" : "grab")};
  z-index: ${({ $isPreview }) => ($isPreview ? 5 : 10)};
  opacity: ${({ $isPreview }) => ($isPreview ? 0.4 : 1)};
  pointer-events: ${({ $isPreview }) => ($isPreview ? "none" : "auto")};
  &:active {
    cursor: ${({ $isPreview }) => ($isPreview ? "default" : "grabbing")};
  }
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
  pointer-events: none;
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

export const InteractionZone = styled.div.attrs<{
  $isVertical: boolean;
  $positionPercent: number;
}>(({ $isVertical, $positionPercent }) => ({
  style: {
    left: $isVertical ? "50%" : `${$positionPercent}%`,
    bottom: $isVertical ? `${$positionPercent}%` : "0",
    transform: $isVertical ? "translate(-50%, 50%)" : "translateX(-50%)",
  },
}))<{ $isVertical: boolean; $thumbSize: number; $positionPercent: number }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $thumbSize }) => $thumbSize}px;
  height: ${({ $thumbSize }) => $thumbSize}px;
  pointer-events: auto;

  &:hover {
    z-index: 900;
  }
  &:hover > div {
    opacity: 1;
  }

  ${({ $isVertical, $thumbSize }) =>
    $isVertical
      ? css`
          width: ${$thumbSize + 40}px;
        `
      : css`
          height: ${$thumbSize + 20}px;
        `}
`;

export const ControlsWrapper = styled.div<{
  $isVertical: boolean;
  $isDragging: boolean;
  $thumbSize: number;
}>`
  position: absolute;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  ${({ $isDragging }) =>
    $isDragging
      ? css`
          opacity: 0;
        `
      : css``}
  ${({ $isVertical }) =>
    $isVertical
      ? css`
          left: 0;
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
  pointer-events: auto;
  &:hover:not(:disabled) {
    background: var(--primary);
    color: var(--background);
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
