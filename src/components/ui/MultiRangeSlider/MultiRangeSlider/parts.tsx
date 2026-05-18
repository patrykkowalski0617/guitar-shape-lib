import styled, { css } from "styled-components";

const grabSize = 30;

interface OrientedProps {
  $vertical?: boolean;
}

export const Wrapper = styled.div<OrientedProps>`
  ${({ $vertical }) =>
    $vertical
      ? css`
          padding: ${grabSize}px 0;
        `
      : css`
          padding: 0 ${grabSize}px;
        `}
  background: #eee;
`;
export const Track = styled.div<OrientedProps>`
  position: relative;
  ${({ $vertical }) =>
    $vertical
      ? css`
          width: 40px;
          height: 100%;
        `
      : css`
          width: 100%;
          height: 40px;
        `}
  user-select: none;
  touch-action: none;
`;

export const ActiveRange = styled.div<OrientedProps>`
  position: absolute;
  background: #333;
  display: flex;
  ${({ $vertical }) =>
    $vertical
      ? css`
          width: 100%;
          flex-direction: column;
        `
      : css`
          height: 100%;
        `}
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

export const Handle = styled.div<OrientedProps>`
  position: absolute;
  background: #000;
  ${({ $vertical }) =>
    $vertical
      ? css`
          width: 100%;
          height: ${grabSize}px;
          cursor: ns-resize;
          &:first-child {
            top: -${grabSize}px;
          }
          &:last-child {
            bottom: -${grabSize}px;
          }
        `
      : css`
          width: ${grabSize}px;
          height: 100%;
          cursor: ew-resize;
          &:first-child {
            left: -${grabSize}px;
          }
          &:last-child {
            right: -${grabSize}px;
          }
        `}
`;
