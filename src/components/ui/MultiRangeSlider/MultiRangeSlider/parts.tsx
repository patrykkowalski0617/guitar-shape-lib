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

  position: relative;

  background:
    ${({ $vertical }) =>
      $vertical
        ? css`
          linear-gradient(
            90deg,
            rgba(0,0,0,0.0002),
            rgba(255,255,255,0.001) 50%,
            rgba(0,0,0,0.002)
          )
        `
        : css`
          linear-gradient(
            180deg,
            rgba(0,0,0,0.02),
            rgba(255,255,255,0.001) 50%,
            rgba(0,0,0,0.0002)
          )
        `},
    ${appBgColor};

  border-radius: 999px;

  overflow: visible;

  box-shadow: 10px 0px 15px 0px
    color-mix(in oklab, var(--background) 20%, transparent) inset;
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
`;

export const ActiveRange = styled.div<OrientedProps>`
  position: absolute;

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

  background:
    ${({ $vertical }) =>
    $vertical
      ? `
          linear-gradient(
            90deg,
            #2f3132 0%,
            #242627 22%,
            #1f2021 50%,
            #242627 78%,
            #2c2e2f 100%
          )
        `
      : `
          linear-gradient(
            180deg,
            #2f3132 0%,
            #242627 22%,
            #1f2021 50%,
            #242627 78%,
            #2c2e2f 100%
          )
        `};

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.045),
    inset 0 -1px 2px rgba(0, 0, 0, 0.22),
    inset 0 0 0 1px rgba(255, 255, 255, 0.025),
    0 1px 3px rgba(0, 0, 0, 0.12);

  &::before {
    content: "";

    position: absolute;
    inset: 0;

    background: ${({ $vertical }) =>
      $vertical
        ? `
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(255,255,255,0.018) 30%,
              rgba(255,255,255,0.035) 50%,
              rgba(255,255,255,0.018) 70%,
              transparent 100%
            )
          `
        : `
            linear-gradient(
              180deg,
              transparent 0%,
              rgba(255,255,255,0.018) 30%,
              rgba(255,255,255,0.035) 50%,
              rgba(255,255,255,0.018) 70%,
              transparent 100%
            )
          `};

    pointer-events: none;
  }
`;

export const Grab = styled.div`
  flex: 1;

  position: relative;

  cursor: grab;

  display: flex;
  align-items: center;
  justify-content: center;

  color: rgba(255, 255, 255, 0.82);

  font-size: 10px;
  font-weight: 600;

  letter-spacing: 0.35px;

  user-select: none;

  transition:
    background 0.12s ease,
    filter 0.12s ease;

  &:active {
    cursor: grabbing;
  }

  body:not(.multi-range-slider--dragging) &:hover {
    background: rgba(255, 255, 255, 0.035);

    filter: brightness(1.04);
  }

  &::before {
    content: "";

    position: absolute;

    width: 40%;
    height: 40%;

    opacity: 0.22;

    background-image: radial-gradient(
      rgba(255, 255, 255, 0.7) 0.7px,
      transparent 0.7px
    );

    background-size: 4px 4px;

    pointer-events: none;
  }
`;

export const Handle = styled.div<OrientedProps>`
  position: absolute;

  z-index: 3;

  user-select: none;
  touch-action: none;

  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.045) 0%,
      rgba(255, 255, 255, 0.015) 14%,
      rgba(0, 0, 0, 0.06) 52%,
      rgba(255, 255, 255, 0.02) 100%
    ),
    linear-gradient(135deg, #4a4c4d 0%, #353738 34%, #262728 68%, #303233 100%);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 2px rgba(0, 0, 0, 0.18),
    0 1px 3px rgba(0, 0, 0, 0.18),
    0 6px 10px rgba(0, 0, 0, 0.08);

  transition:
    filter 0.12s ease,
    background 0.12s ease,
    box-shadow 0.12s ease;

  ${({ $vertical }) =>
    $vertical
      ? css`
          width: 100%;
          height: ${grabSize}px;

          cursor: ns-resize;

          &:first-child {
            top: -${grabSize}px;
            border-radius: 18px 18px 0 0;
          }

          &:last-child {
            bottom: -${grabSize}px;
            border-radius: 0 0 18px 18px;
          }
        `
      : css`
          width: ${grabSize}px;
          height: 100%;

          cursor: ew-resize;

          &:first-child {
            left: -${grabSize}px;
            border-radius: 18px 0 0 18px;
          }

          &:last-child {
            right: -${grabSize}px;
            border-radius: 0 18px 18px 0;
          }
        `}

  &:hover {
    filter: brightness(1.03);

    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.06) 0%,
        rgba(255, 255, 255, 0.02) 14%,
        rgba(0, 0, 0, 0.05) 52%,
        rgba(255, 255, 255, 0.025) 100%
      ),
      linear-gradient(
        135deg,
        #555758 0%,
        #404243 34%,
        #303233 68%,
        #3a3c3d 100%
      );

    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.11),
      inset 0 -1px 2px rgba(0, 0, 0, 0.18),
      0 2px 5px rgba(0, 0, 0, 0.18),
      0 10px 16px rgba(0, 0, 0, 0.1);
  }

  &:active {
    filter: brightness(0.985);
  }

  &::before {
    content: "";

    position: absolute;

    inset: 0;

    opacity: 0.08;

    border-radius: inherit;

    background: repeating-linear-gradient(
      ${({ $vertical }) => ($vertical ? "0deg" : "90deg")},
      rgba(255, 255, 255, 0.22) 0px,
      rgba(255, 255, 255, 0.22) 1px,
      transparent 1px,
      transparent 5px
    );

    pointer-events: none;
  }
`;
