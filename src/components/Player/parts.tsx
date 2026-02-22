import { instrumentElBRadius } from "@/parts";
import styled from "styled-components";

export const PlayerScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;
  height: 26px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const PlayerRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  margin-left: auto;
  margin-right: auto;
  flex-shrink: 0;
  width: max-content;
`;

const BasePlayerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${instrumentElBRadius};
  height: 100%;
  width: 26px;
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
