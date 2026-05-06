import styled, { css, keyframes } from "styled-components";
import {
  playerElementCommon,
  playerElementHeight,
  playerTextShadow,
} from "../constants";
import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts/constants";
import { BrickOptions } from "./BrickOptions/parts";

const flash = keyframes`
  0% { background-color: color-mix(in oklab, var(--primary) 45%, var(--background)); }
  50% { background-color: color-mix(in oklab, var(--primary) 60%, var(--background)); }
  100% { background-color: color-mix(in oklab, var(--primary) 45%, var(--background)); }
`;

export const PartsContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
`;

export const Part = styled.div<{ $unit: number; $isActive: boolean }>`
  width: ${({ $unit }) => $unit}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex-shrink: 0;
  opacity: 0.5;
  &::after,
  &::before {
    content: "";
    width: 1px;
    height: 1px;
    background-color: var(--border);
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: color-mix(
        in oklab,
        var(--primary) 70%,
        var(--background)
      );
    `}
`;

export const Brick = styled.div<{
  $isEditable: boolean;
  $isActive: boolean;
  $widthUnit: number;
  $unit: number;
  $isDragging?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $widthUnit, $unit }) => $widthUnit * $unit}px;
  height: ${playerElementHeight};
  padding: 0 4px;
  border-radius: ${instrumentElBRadius};
  position: relative;
  user-select: none;
  flex-shrink: 0;

  ${({ $isActive }) =>
    $isActive
      ? css`
          background-color: color-mix(
            in oklab,
            var(--primary) 60%,
            var(--background)
          );
          font-weight: 600;
          border: 1px solid
            color-mix(in oklab, var(--border) 100%, var(--background));
          color: color-mix(in oklab, var(--foreground) 100%, transparent);
        `
      : css`
          background-color: color-mix(
            in oklab,
            var(--primary) 40%,
            var(--background)
          );
          border: 1px solid
            color-mix(in oklab, var(--border) 90%, var(--background));
          color: color-mix(in oklab, var(--foreground) 90%, transparent);
        `};
  opacity: ${({ $isDragging }) => ($isDragging ? 0.4 : 1)};
  ${({ $isEditable }) =>
    $isEditable
      ? css`
          cursor: ew-resize;
          animation: ${flash} 1.5s ease-in-out infinite;
          border-color: var(--primary);
          ${BrickOptions} {
            opacity: 1;
          }
        `
      : css`
          cursor: grab;
        `};
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  ${playerElementCommon}
  ${({ $isDragging }) =>
    $isDragging &&
    css`
      opacity: 0.2;
      transform: scale(0.9);
      border: 1px dashed var(--border);
      pointer-events: none;
    `}

  &:hover {
    ${BrickOptions} {
      opacity: 1;
    }
  }
`;

export const Label = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  pointer-events: none;
  position: relative;
  z-index: 5;
  ${playerTextShadow}
  padding: 2px;
`;
