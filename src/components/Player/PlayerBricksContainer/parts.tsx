import styled from "styled-components";
import { instrumentElBRadius } from "@/parts";

interface WrapperProps {
  $isPlaying: boolean;
}

export const BrickDragWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  &[draggable="true"] {
    user-select: none;
    -webkit-user-drag: element;
  }
`;

export const PlayerScrollWrapper = styled.div<WrapperProps>`
  overflow-x: auto;
  align-items: center;
  height: 100%;
  pointer-events: ${(props) => (props.$isPlaying ? "none" : "auto")};

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
  margin-left: auto;
  margin-right: auto;
  flex-shrink: 0;
  width: max-content;
`;

export const BasePlayerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${instrumentElBRadius};
  height: 100%;
  width: 30px;
  color: var(--primary-foreground);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AddBrickButton = styled(BasePlayerButton)`
  color: var(--muted-foreground);
  border: 1px dashed color-mix(in oklab, var(--border) 50%, var(--background));
  background-color: color-mix(in oklab, var(--muted) 20%, var(--background));
  &:hover {
    background-color: color-mix(in oklab, var(--muted) 50%, var(--background));
    color: var(--foreground);
  }
`;

export const DeleteButton = styled(BasePlayerButton)`
  border: 1px solid var(--primary);
  color: var(--primary);
  background-color: color-mix(in oklab, var(--muted) 20%, var(--background));
  &:hover {
    background-color: color-mix(in oklab, var(--muted) 50%, var(--background));
  }
`;

export const CheckButton = styled(BasePlayerButton)`
  background-color: color-mix(in oklab, var(--accent) 70%, var(--background));
  &:hover {
    background-color: color-mix(in oklab, var(--accent) 90%, var(--background));
  }
`;
