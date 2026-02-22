import { instrumentElBRadius } from "@/parts";
import styled, { css, keyframes } from "styled-components";

const flash = keyframes`
  0% { background-color: color-mix(in oklab, var(--accent) 10%, transparent); }
  50% { background-color: color-mix(in oklab, var(--accent) 40%, transparent); }
  100% { background-color: color-mix(in oklab, var(--accent) 10%, transparent); }
`;

export const TicksContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: flex-start;
`;

export const Tick = styled.div<{ $unit: number }>`
  width: ${({ $unit }) => $unit}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex-shrink: 0;
  &:last-child {
    display: none;
  }
  &::after,
  &::before {
    content: "";
    width: 1px;
    height: 1px;
    background-color: var(--border);
    opacity: 0.7;
  }
`;

export const BrickOptions = styled.div<{ $isEditable: boolean }>`
  height: 100%;
  border-radius: ${instrumentElBRadius};
  transition: all 0.1s ease;
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  background-color: color-mix(in oklab, var(--accent) 40%, var(--background));
  opacity: ${({ $isEditable }) => ($isEditable ? 0 : 0.9)};
  pointer-events: none;
  z-index: 2;
`;

export const Brick = styled.div<{ $isEditable: boolean; $widthUnit: number; $unit: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $widthUnit, $unit }) => $widthUnit * $unit}px;
  height: 100%;
  padding: 0 4px;
  border-radius: ${instrumentElBRadius};
  position: relative;
  cursor: ${({ $isEditable }) => ($isEditable ? "ew-resize" : "pointer")};
  user-select: none;
  border: 1px solid color-mix(in oklab, var(--border) 20%, transparent);
  background-color: color-mix(in oklab, var(--accent) 5%, transparent);
  color: var(--foreground);
  transition:
    background-color 0.15s ease-in-out,
    width 0.1s ease-out;
  flex-shrink: 0;

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
