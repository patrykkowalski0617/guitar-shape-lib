import styled, { css } from "styled-components";

export const InteractionContainer = styled.div<{
  $isVertical: boolean;
  $thumbSize: number;
  $isDragging?: boolean;
}>`
  position: absolute;
  z-index: 2;

  --zone-multiplier: 100;

  &:hover {
    --zone-multiplier: 200;
  }

  ${({ $isDragging, $isVertical, $thumbSize }) => {
    const draggingStyles = $isDragging ? "none" : "auto";
    const visibilityStatus = $isDragging ? "hidden" : "visible";
    const offsetValue = `${$thumbSize / 2}px`;

    return css`
      pointer-events: ${draggingStyles};
      visibility: ${visibilityStatus};
      ${$isVertical
        ? css`
            top: ${offsetValue};
            bottom: ${offsetValue};
            left: 0;
            right: 0;
          `
        : css`
            top: 0;
            bottom: 0;
            left: ${offsetValue};
            right: ${offsetValue};
          `};
    `;
  }}
`;

interface InteractionZoneProps {
  $isVertical: boolean;
  $positionPercent: number;
  $thumbSize: number;
  $numberOfSelectedTicks: number;
}

export const InteractionZone = styled.div.attrs<InteractionZoneProps>(
  ({ $isVertical, $positionPercent, $thumbSize, $numberOfSelectedTicks }) => {
    const hasMultipleTicks = $numberOfSelectedTicks > 1;
    const fallbackSize = `${$thumbSize + 30}px`;

    const horizontalPosition = $isVertical ? "100%" : `${$positionPercent}%`;
    const verticalPosition = $isVertical ? `${$positionPercent}%` : "0";
    const transformation = $isVertical
      ? "translate(-50%, 50%)"
      : "translateX(-50%)";

    const zoneWidth = $isVertical
      ? fallbackSize
      : hasMultipleTicks
        ? `calc(var(--zone-multiplier) * 1% / ${$numberOfSelectedTicks - 1})`
        : fallbackSize;

    const zoneHeight = $isVertical
      ? hasMultipleTicks
        ? `calc(var(--zone-multiplier) * 1% / ${$numberOfSelectedTicks - 1})`
        : fallbackSize
      : fallbackSize;

    return {
      style: {
        left: horizontalPosition,
        bottom: verticalPosition,
        transform: transformation,
        width: zoneWidth,
        height: zoneHeight,
      },
    };
  },
)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  z-index: 10;

  &:hover + & {
    z-index: 20;
  }

  &:hover {
    z-index: 30;
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
  pointer-events: none;
  gap: 1px;
  flex-direction: ${({ $isVertical }) =>
    $isVertical ? "column-reverse" : "row"};
  ${({ $isVertical }) => ($isVertical ? "right: 0;" : "top: 0;")}
  background-color: color-mix(in oklab, var(--background) 60%, transparent);
  ${({ $isVertical }) => ($isVertical ? "height: 100%;" : "width: 100%;")}
`;

export const CutButton = styled.button<{
  $isVertical: boolean;
}>`
  all: unset;
  height: ${({ $isVertical }) => ($isVertical ? "50%" : "30px")};
  width: ${({ $isVertical }) => ($isVertical ? "30px" : "50%")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100%;
  cursor: pointer;
  pointer-events: auto;
  color: var(--foreground);
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
