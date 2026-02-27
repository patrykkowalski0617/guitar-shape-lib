import styled from "styled-components";
import { playerElementHeight } from "../ui/parts";

export const BrickDragWrapper = styled.div`
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

export const PlayerWrapper = styled.div<{
  $isPlaying: boolean;
}>`
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  min-height: ${playerElementHeight};
  pointer-events: ${(props) => (props.$isPlaying ? "none" : "auto")};
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ControlsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
