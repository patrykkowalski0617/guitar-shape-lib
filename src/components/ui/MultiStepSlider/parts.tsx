import styled, { css } from "styled-components";
import { insetShadow } from "@/constants";

export const SliderRoot = styled.div<{ $isVertical: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  user-select: none;
  width: ${({ $isVertical }) => ($isVertical ? "32px" : "100%")};
  height: ${({ $isVertical }) => ($isVertical ? "100%" : "32px")};
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
    bottom: $isVertical ? `${$tickPos}%` : "auto",
    left: $isVertical ? "50%" : `${$tickPos}%`,
    top: $isVertical ? "auto" : "50%",
    transform: $isVertical ? "translate(-50%, 50%)" : "translate(-50%, -50%)",
  },
}))<{ $tickPos: number; $isVertical: boolean }>`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 35%,
    var(--foreground) 0%,
    color-mix(in oklab, var(--primary) 100%, var(--foreground)) 30%
  );
  box-shadow:
    4px 4px 8px 0px var(--background),
    -2px -2px 4px 0px var(--background) inset;
  z-index: 3;
  border: 1px solid var(--background);
  pointer-events: none;
  filter: blur(0.4px);
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
  }) => ({
    style: {
      bottom: $isVertical
        ? `calc(${$startPos}% - ${$thumbSize / 2}px)`
        : "auto",
      left: $isVertical ? "50%" : `calc(${$startPos}% - ${$thumbSize / 2}px)`,
      top: $isVertical ? "auto" : "50%",
      height: $isVertical
        ? `calc(${$totalWidth}% + ${$thumbSize}px)`
        : `${$thumbSize}px`,
      width: $isVertical
        ? `${$thumbSize}px`
        : `calc(${$totalWidth}% + ${$thumbSize}px)`,
      transform: $isVertical ? "translateX(-50%)" : "translateY(-50%)",
      opacity: $isPreview ? 1 : $hasActivePreview ? 0.5 : 1,
      cursor: $isDragging ? "grabbing" : $isPreview ? "default" : "grab",
    },
  }),
)<any>`
  position: absolute;
  filter: blur(0.4px);
  border-radius: 99px;
  border: 1px solid var(--background);
  box-shadow:
    4px 4px 8px 0px var(--background),
    -2px -2px 4px 0px var(--background) inset,
    0px 0px 2px 4px var(--primary) inset;
  z-index: ${({ $isPreview, $isDragging }) =>
    $isPreview ? 15 : $isDragging ? 20 : 10};
  pointer-events: ${({ $isPreview }) => ($isPreview ? "none" : "auto")};
  outline: 1px var(--background) solid;
  outline-offset: -6px;
  &::before {
    content: "";
    inset: 5px;
    position: absolute;
    border-radius: 100px;
    box-shadow: 0 0 4px 3px var(--background);
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
  top: ${({ $isVertical, $thumbSize }) =>
    $isVertical ? `${$thumbSize / 2}px` : "0"};
  bottom: ${({ $isVertical, $thumbSize }) =>
    $isVertical ? `${$thumbSize / 2}px` : "0"};
  left: ${({ $isVertical, $thumbSize }) =>
    $isVertical ? "0" : `${$thumbSize / 2}px`};
  right: ${({ $isVertical, $thumbSize }) =>
    $isVertical ? "0" : `${$thumbSize / 2}px`};
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
}))<any>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $isVertical, $thumbSize }) =>
    $isVertical ? $thumbSize + 40 : $thumbSize}px;
  height: ${({ $isVertical, $thumbSize }) =>
    $isVertical ? $thumbSize : $thumbSize + 20}px;
  pointer-events: auto;
  &:hover {
    z-index: 90;
  }
  &:hover > div {
    opacity: 1;
  }
`;

export const ControlsWrapper = styled.div<{
  $isVertical: boolean;
  $isDragging: boolean;
}>`
  position: absolute;
  display: flex;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  gap: 1px;
  flex-direction: ${({ $isVertical }) =>
    $isVertical ? "column-reverse" : "row"};
  ${({ $isVertical }) => ($isVertical ? "left: 0;" : "top: 0;")}
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

export const IconWrapper = styled.span`
  display: block;
  transform: rotate(90deg);
`;
