import { appBgColor } from "@/constants";
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
  background: ${appBgColor};
  background: ${({ $vertical }) =>
    $vertical
      ? `linear-gradient(90deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05), rgba(0,0,0,0.2))`
      : `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05), rgba(0,0,0,0.2))`};
  border-radius: 999px;
`;

export const Track = styled.div<OrientedProps>`
  position: relative;
  ${({ $vertical }) =>
    $vertical
      ? css`
          width: 30px;
          height: 100%;
        `
      : css`
          width: 100%;
          height: 30px;
        `}
  user-select: none;
  touch-action: none;

  /* EFEKT: subtelna faktura */
`;

export const ActiveRange = styled.div<OrientedProps>`
  position: absolute;
  background: #1e1e1e;
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

  /* EFEKT: głębia + subtelny akcent */
  background: ${({ $vertical }) =>
    $vertical
      ? `linear-gradient(90deg, #252525, #1a1a1a, #252525)`
      : `linear-gradient(180deg, #252525, #1a1a1a, #252525)`};
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 2px 4px rgba(0, 0, 0, 0.4);
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

  /* EFEKT: dyskretne rozjaśnienie */
  transition: all 0.1s ease;
  font-weight: 500;
  letter-spacing: 0.3px;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    letter-spacing: 0.6px;
  }

  &:active {
    transform: scale(0.97);
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
            border-radius: 20px 20px 0 0;
          }
          &:last-child {
            bottom: -${grabSize}px;
            border-radius: 0 0 20px 20px;
          }
        `
      : css`
          width: ${grabSize}px;
          height: 100%;
          cursor: ew-resize;
          &:first-child {
            left: -${grabSize}px;
            border-radius: 20px 0 0 20px;
          }
          &:last-child {
            right: -${grabSize}px;
            border-radius: 0 20px 20px 0;
          }
        `}

  /* EFEKT: metaliczny połysk */
  background: linear-gradient(135deg, #2a2a2a, #0f0f0f);

  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transition: all 0.1s ease;

  &:hover {
    background: linear-gradient(135deg, #3a3a3a, #181818);
    transform: scale(1.04);
    box-shadow:
      0 3px 10px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.97);
  }
`;
