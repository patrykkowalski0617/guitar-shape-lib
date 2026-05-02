import styled, { css, keyframes } from "styled-components";
import { playerElementCommon, playerElementHeight } from "../constants";
import { instrumentElBRadius } from "@/components/Piano/PianoKey/parts/constants";

const flash = keyframes`
  0% { background-color: color-mix(in oklab, var(--accent) 45%, var(--background)); }
  50% { background-color: color-mix(in oklab, var(--accent) 60%, var(--background)); }
  100% { background-color: color-mix(in oklab, var(--accent) 45%, var(--background)); }
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
  &::after,
  &::before {
    content: "";
    width: 1px;
    height: 1px;
    background-color: var(--border);
    opacity: 0.7;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: color-mix(
        in oklab,
        var(--accent) 70%,
        var(--background)
      );
    `}
`;

export const BrickOptions = styled.div<{ $isEditable: boolean }>`
  border-radius: ${instrumentElBRadius};
  transition: all 0.1s ease;
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 2px;
  background-color: color-mix(in oklab, var(--accent) 40%, var(--background));
  opacity: ${({ $isEditable }) => ($isEditable ? 0 : 0.8)};
  pointer-events: none;
  z-index: 2;
  box-shadow:
    1px 1px 4px 1px color-mix(in oklab, var(--background) 70%, transparent)
      inset,
    -1px -1px 3px 0px color-mix(in oklab, var(--foreground) 20%, transparent)
      inset;
`;

export const Brick = styled.div<{
  $isEditable: boolean;
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
  border: 1px solid color-mix(in oklab, var(--border) 90%, var(--background));
  background-color: color-mix(in oklab, var(--accent) 45%, var(--background));
  color: var(--foreground);
  flex-shrink: 0;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.4 : 1)};
  cursor: ${({ $isEditable }) => ($isEditable ? "ew-resize" : "grab")};
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
      display: ${({ $isEditable }) => ($isEditable ? "none" : "flex")};
    }
  }

  ${({ $isEditable }) =>
    $isEditable &&
    css`
      animation: ${flash} 1.5s ease-in-out infinite;
      border-color: var(--accent);
    `}
`;

export const Label = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  font-size: 11px;
  color: var(--foreground);
  pointer-events: none;
  z-index: 1;
`;
