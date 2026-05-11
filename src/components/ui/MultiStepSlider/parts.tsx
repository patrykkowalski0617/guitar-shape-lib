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
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--foreground) 0%,
    var(--primary) 10%,
    var(--background) 100%
  );
  box-shadow: 2px 2px 8px 2px var(--background);
  z-index: 3;
  pointer-events: none;
`;

export const SliderThumb = styled.div.attrs<{
  $isVertical: boolean;
  $startPos: number;
  $totalWidth: number;
  $thumbSize: number;
  $isDragging?: boolean;
  $isPreview?: boolean;
  $hasActivePreview?: boolean;
}>(
  ({
    $isVertical,
    $startPos,
    $totalWidth,
    $thumbSize,
    $isDragging,
    $isPreview,
    $hasActivePreview,
  }) => {
    const halfThumb = `${$thumbSize / 2}px`;
    const posOffset = `calc(${$startPos}% - ${halfThumb})`;
    const dynamicSize = `calc(${$totalWidth}% + ${$thumbSize}px)`;
    const thickness = `${$thumbSize}px`;

    let opacity = 1;
    if ($isPreview) {
      opacity = 1;
    } else if ($hasActivePreview) {
      opacity = 0.5;
    }

    return {
      style: {
        bottom: $isVertical ? posOffset : "auto",
        left: $isVertical ? "50%" : posOffset,
        top: $isVertical ? "auto" : "50%",
        height: $isVertical ? dynamicSize : thickness,
        width: $isVertical ? thickness : dynamicSize,
        transform: $isVertical ? "translateX(-50%)" : "translateY(-50%)",
        cursor: $isDragging ? "grabbing" : $isPreview ? "default" : "grab",
        opacity: opacity,
      },
    };
  },
)<{
  $isVertical: boolean;
  $startPos: number;
  $totalWidth: number;
  $thumbSize: number;
  $isDragging?: boolean;
  $isPreview?: boolean;
  $hasActivePreview?: boolean;
}>`
  position: absolute;
  border-radius: 99px;
  border: 1px solid var(--background);
  box-shadow:
    4px 4px 8px 0px var(--background),
    0px 0px 4px 1px var(--background) inset,
    0px 0px 2px 4px var(--primary) inset;

  z-index: ${({ $isPreview, $isDragging }) => {
    if ($isPreview) return 15;
    if ($isDragging) return 20;
    return 10;
  }};

  pointer-events: ${({ $isPreview }) => ($isPreview ? "none" : "auto")};

  &:active {
    cursor: ${({ $isPreview }) => ($isPreview ? "default" : "grabbing")};
  }
`;
export const InteractionContainer = styled.div<{
  $isVertical: boolean;
  $thumbSize: number;
  $isDragging?: boolean;
}>`
  position: absolute;
  z-index: 2;
  pointer-events: ${({ $isDragging }) => ($isDragging ? "none" : "auto")};
  visibility: ${({ $isDragging }) => ($isDragging ? "hidden" : "visible")};
  ${({ $isVertical, $thumbSize }) => {
    const offset = `${$thumbSize / 2}px`;
    if ($isVertical) {
      return css`
        left: 0;
        right: 0;
        top: ${offset};
        bottom: ${offset};
      `;
    }
    return css`
      top: 0;
      bottom: 0;
      left: ${offset};
      right: ${offset};
    `;
  }}
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
    z-index: 90;
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
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  gap: 1px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  pointer-events: auto;
  color: var(--background);
  &:hover:not(:disabled) {
    color: var(--primary);
  }
  &:disabled {
    opacity: 0.3;
  }
`;
