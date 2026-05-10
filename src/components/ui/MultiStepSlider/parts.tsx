import { insetShadow } from "@/constants";
import styled, { css } from "styled-components";

interface StyledProps {
  $isVertical?: boolean;
  $thumbSize?: number;
  $isFirst?: boolean;
  $isVisible?: boolean;
}

export const Tick = styled.div<{
  $isOpacityAnimationLocked?: boolean;
  $opacityAnimationDuration?: number;
}>`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--primary) 0%, var(--muted) 100%);
  box-shadow: 2px 2px 8px 2px var(--background);
  top: auto;
  left: auto;
`;

export const SliderRoot = styled.div<StyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const SliderTrack = styled.div<StyledProps>`
  position: relative;
  background-color: color-mix(in oklab, var(--background) 50%, transparent);
  border-radius: 9999px;
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

export const ControlsWrapper = styled.div<StyledProps>`
  position: absolute;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  z-index: 20;
  ${({ $isVertical, $thumbSize = 28 }) =>
    $isVertical
      ? css`
          flex-direction: row;
          left: ${$thumbSize + 8}px;
          top: 50%;
          transform: translateY(-50%);
        `
      : css`
          flex-direction: row;
          bottom: ${$thumbSize + 8}px;
          left: 50%;
          transform: translateX(-50%);
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
  &:hover {
    background: var(--primary);
    color: var(--background);
  }
`;

export const ThumbVisual = styled.div<StyledProps>`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 1px solid var(--primary);
  box-shadow:
    2px 2px 8px 2px var(--background),
    0px 0px 2px 1px var(--border) inset,
    0px 0px 3px 2px var(--contrast) inset;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: transform 0.2s;
`;

export const SliderThumb = styled.div<StyledProps>`
  position: absolute;
  display: block;
  cursor: grab;
  width: ${({ $thumbSize }) => $thumbSize}px;
  height: ${({ $thumbSize }) => $thumbSize}px;

  ${({ $isVertical }) =>
    $isVertical
      ? css`
          left: 50%;
          transform: translateX(-50%);
        `
      : css`
          top: 50%;
          transform: translateY(-50%);
        `}

  &:active {
    cursor: grabbing;
  }
  &:hover {
    ${({ $isFirst }) =>
      !$isFirst &&
      css`
        ${ThumbVisual} {
          transform: scale(1.1);
        }
      `}
    ${ControlsWrapper} {
      opacity: 1;
    }
  }
`;
