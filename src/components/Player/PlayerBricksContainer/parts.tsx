import styled from "styled-components";

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
