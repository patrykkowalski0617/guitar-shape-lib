import { instrumentElBRadius } from "@/parts";
import styled, { css, keyframes } from "styled-components";

const flash = keyframes`
  0% {
    background-color: color-mix(in oklab, var(--primary) 20%, transparent);
  }
  50% {
    background-color: color-mix(in oklab, var(--primary) 80%, transparent);
  }
  100% {
    background-color: color-mix(in oklab, var(--primary) 20%, transparent);
  }
`;

export const BrickOptions = styled.div<{ $isEditable: boolean }>`
  height: 100%;
  padding: 0px;
  border-radius: ${instrumentElBRadius};
  transition: all 0.1s ease;
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  background-color: color-mix(in oklab, var(--accent) 20%, var(--background));
  opacity: ${({ $isEditable }) => ($isEditable ? 0 : 0.9)};
`;

export const Brick = styled.div<{ $isEditable: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  height: 100%;
  padding: 0 6px;
  border-radius: ${instrumentElBRadius};
  position: relative;
  cursor: pointer;
  user-select: none;
  border: 1px solid color-mix(in oklab, var(--border) 10%, transparent);
  background-color: color-mix(in oklab, var(--accent) 5%, transparent);
  color: var(--foreground);
  transition: background-color 0.15s ease-in-out;
  &:hover {
    ${BrickOptions} {
      display: flex;
    }
  }
  ${({ $isEditable }) =>
    $isEditable &&
    css`
      animation: ${flash} 1.5s ease-in-out infinite;
    `}
`;

export const Label = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  font-size: 12px;
  color: var(--foreground);
`;
