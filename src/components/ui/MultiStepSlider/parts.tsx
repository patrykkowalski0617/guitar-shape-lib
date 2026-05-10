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

export const InteractionContainer = styled.div<{ $isVertical: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  z-index: 2;
  left: calc((28px / 2)); // thumbSize / 2
  right: calc((28px / 2)); // thumbSize / 2
  outline: red 1px solid;
  ${({ $isVertical }) =>
    $isVertical
      ? css`
          flex-direction: column-reverse;
        `
      : css`
          flex-direction: row;
        `}
`;
const numOfChildren = 4;
export const InteractionZone = styled.div<{
  $isVertical: boolean;
  $thumbSize: number;
}>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: 1px green solid;
  position: absolute;
  transform: translateX(-50%);
  height: 60px;
  bottom: 0;
  &:nth-child(1) {
    width: calc(100% / ${numOfChildren - 1});

    left: 0;
  }
  &:nth-child(2) {
    width: calc(100% / ${numOfChildren - 1});

    left: calc(100% / ${numOfChildren - 1});
  }
  &:nth-child(3) {
    width: calc(100% / ${numOfChildren - 1});

    left: calc(100% / ${numOfChildren - 1} * 2);
  }

  &:nth-child(4) {
    width: calc(100% / ${numOfChildren - 1});

    left: calc(100% / ${numOfChildren - 1} * 3);
  }

  &:nth-child(5) {
    width: calc(100% / ${numOfChildren - 1});

    left: calc(100% / ${numOfChildren - 1} * 4);
  }
  &:nth-child(6) {
    width: calc(100% / ${numOfChildren - 1});

    left: calc(100% / ${numOfChildren - 1} * 5);
  }
  &:nth-child(7) {
    width: calc(100% / ${numOfChildren - 1});

    left: calc(100% / ${numOfChildren - 1} * 6);
  }
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
  opacity: 0.5;
  transition: opacity 0.2s;
  pointer-events: none;

  ${({ $isVertical, $thumbSize }) =>
    $isVertical
      ? css`
          left: ${$thumbSize + 8}px;
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
