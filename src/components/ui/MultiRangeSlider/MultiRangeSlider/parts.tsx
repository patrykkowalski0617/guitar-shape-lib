import styled from "styled-components";

const grabSize = 30;

export const Wrapper = styled.div`
  padding: 0 ${grabSize}px;
  background: #eee;
`;
export const Track = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  user-select: none;
  touch-action: none;
`;

export const ActiveRange = styled.div`
  position: absolute;
  height: 100%;
  background: #333;
  display: flex;
`;

export const Grab = styled.div`
  flex: 1;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  &:active {
    cursor: grabbing;
  }
`;

export const Handle = styled.div`
  width: ${grabSize}px;
  position: absolute;
  height: 100%;
  &:first-child {
    left: -${grabSize}px;
  }
  &:last-child {
    right: -${grabSize}px;
  }
  background: #000;
  cursor: ew-resize;
`;
