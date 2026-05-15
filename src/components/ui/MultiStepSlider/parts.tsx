import styled, { css } from "styled-components";

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
  box-shadow:
    3px 3px 6px 1px color-mix(in oklab, var(--background) 60%, transparent)
      inset,
    -1px -1px 1px 0px color-mix(in oklab, var(--foreground) 60%, transparent)
      inset,
    3px 3px 10px 2px color-mix(in oklab, var(--foreground) 20%, transparent),
    -1px -1px 8px 3px color-mix(in oklab, var(--background) 80%, transparent);
  ${({ $isVertical, $thumbSize }) =>
    $isVertical
      ? css`
          width: 5px;
          height: calc(100% - ${$thumbSize}px);
        `
      : css`
          height: 5px;
          width: calc(100% - ${$thumbSize}px);
        `};
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
    2px 2px 5px 1px color-mix(in oklab, var(--background) 80%, transparent),
    -2px -2px 4px 0px var(--background) inset;
  z-index: 3;
  border: 1px solid var(--background);
  pointer-events: none;
  filter: blur(0.4px);
`;

interface SliderThumbProps {
  $isVertical: boolean;
  $startPos: number;
  $totalWidth: number;
  $thumbSize: number;
  $isDragging?: boolean;
  $isPreview?: boolean;
  $hasActivePreview?: boolean;
}

interface SliderThumbProps {
  $isVertical: boolean;
  $startPos: number;
  $totalWidth: number;
  $thumbSize: number;
  $isDragging?: boolean;
  $isPreview?: boolean;
  $hasActivePreview?: boolean;
  $opacityValue?: number;
}

export const SliderThumb = styled.div.attrs<SliderThumbProps>(
  ({
    $isVertical,
    $startPos,
    $totalWidth,
    $thumbSize,
    $isDragging,
    $isPreview,
    $hasActivePreview,
  }) => {
    const calcPos = `calc(${$startPos}% - ${$thumbSize / 2}px)`;
    const calcSize = `calc(${$totalWidth}% + ${$thumbSize}px)`;
    const thumbSizePx = `${$thumbSize}px`;

    const opacityValue = $isPreview ? 1 : $hasActivePreview ? 0.5 : 1;
    const cursorType = $isDragging
      ? "grabbing"
      : $isPreview
        ? "default"
        : "grab";

    return {
      $opacityValue: opacityValue,
      style: {
        bottom: $isVertical ? calcPos : "auto",
        left: $isVertical ? "50%" : calcPos,
        top: $isVertical ? "auto" : "50%",
        height: $isVertical ? calcSize : thumbSizePx,
        width: $isVertical ? thumbSizePx : calcSize,
        transform: $isVertical ? "translateX(-50%)" : "translateY(-50%)",
        cursor: cursorType,
      },
    };
  },
)`
  position: absolute;
  pointer-events: ${({ $isPreview }) => ($isPreview ? "none" : "auto")};
  outline: 1px var(--background) solid;
  outline-offset: -6px;
  border-radius: 99px;
  z-index: ${({ $isPreview, $isDragging }) =>
    $isPreview ? 16 : $isDragging ? 21 : 11};
  &::before {
    content: "";
    inset: 6px;
    position: absolute;
    border-radius: 100px;
    box-shadow: 0 0 4px 3px
      color-mix(in oklab, var(--background) 60%, transparent);
    border-radius: 99px;
    z-index: 1;
  }

  &:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 99px;
    box-shadow:
      4px 4px 8px 0px var(--background),
      -2px -2px 4px 0px var(--background) inset,
      0px 0px 2px 4px var(--primary) inset;
    filter: blur(0.4px);
    border-radius: 99px;
    border: 1px solid var(--background);
    opacity: ${({ $opacityValue }) => $opacityValue};
  }
`;
