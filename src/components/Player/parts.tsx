import { instrumentElBRadius } from "@/parts";
import styled from "styled-components";

export const PlayerRow = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  align-items: center;
  justify-content: center;
  height: 24px;
`;

const BasePlayerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${instrumentElBRadius};
  height: 100%;
  width: 24px;
  color: var(--primary-foreground);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
`;

export const GlobalCheckButton = styled(BasePlayerButton)`
  background-color: color-mix(in oklab, var(--accent) 70%, transparent);
  &:hover {
    background-color: color-mix(in oklab, var(--accent) 90%, transparent);
  }
`;

export const GlobalDeleteButton = styled(BasePlayerButton)`
  background-color: color-mix(in oklab, var(--primary) 70%, transparent);
  &:hover {
    background-color: color-mix(in oklab, var(--primary) 90%, transparent);
  }
`;

export const AddBrickButton = styled(BasePlayerButton)`
  color: var(--muted-foreground);
  border: 1px dashed color-mix(in oklab, var(--border) 50%, transparent);
  &:hover {
    background-color: color-mix(in oklab, var(--muted) 50%, transparent);
    color: var(--foreground);
  }
`;
