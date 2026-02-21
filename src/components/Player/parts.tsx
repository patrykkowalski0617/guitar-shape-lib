import styled from "styled-components";

export const PlayerRow = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  overflow-x: auto;
  align-items: center;
  justify-content: center;
  height: 24px;
`;

export const GlobalCheckButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  padding: 0 10px;
  height: 100%;
  background-color: color-mix(in oklab, var(--accent) 70%, transparent);
  color: var(--primary-foreground);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  &:hover {
    background-color: color-mix(in oklab, var(--accent) 90%, transparent);
  }
`;
