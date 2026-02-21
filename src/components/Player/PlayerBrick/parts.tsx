import styled, { css, keyframes } from "styled-components";

const flash = keyframes`
  0% {
    background-color: color-mix(in oklab, var(--primary) 40%, transparent);
  }
  50% {
    background-color: color-mix(in oklab, var(--primary) 80%, transparent);
  }
  100% {
    background-color: color-mix(in oklab, var(--primary) 40%, transparent);
  }
`;

export const EditButton = styled.button<{ $isEditable: boolean }>`
  height: 100%;
  width: 20px;
  padding: 0px;
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid transparent;
  transition: all 0.1s ease;
  display: none;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div<{ $isEditable: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  height: 24px;
  padding: 0 6px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  user-select: none;
  border: 1px solid color-mix(in oklab, var(--border) 50%, transparent);
  background-color: color-mix(in oklab, var(--accent) 5%, transparent);
  color: var(--foreground);
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: color-mix(in oklab, var(--accent) 20%, transparent);
    ${EditButton} {
      display: flex;
    }
  }
  ${({ $isEditable }) =>
    $isEditable &&
    css`
      border-color: var(--accent);
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
