import styled from "styled-components";

export const Track = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  background: #eee;
  user-select: none;
  touch-action: none;
`;

export const ActiveRange = styled.div`
  position: absolute;
  height: 100%;
  background: #2d2d2d;
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
  width: 15px;
  background: rgba(0, 0, 0, 0.2);
  cursor: ew-resize;
`;
