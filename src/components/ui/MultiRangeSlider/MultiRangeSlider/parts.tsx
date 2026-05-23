import { appBgColor } from "@/constants";
import styled, { css } from "styled-components";

export const grabSize = 50;
export interface OrientedProps {
  $vertical?: boolean;
}

export const Wrapper = styled.div<OrientedProps>`
  position: relative;
  overflow: visible;
  padding: ${({ $vertical }) =>
    $vertical ? `${grabSize}px 0` : `0 ${grabSize}px`};
`;

export const Track = styled.div<OrientedProps>`
  position: relative;
  user-select: none;
  touch-action: none;

  ${({ $vertical }) =>
    $vertical
      ? css`
          width: ${grabSize}px;
          height: 100%;
        `
      : css`
          width: 100%;
          height: ${grabSize}px;
        `}
`;

export const ActiveRange = styled.div<OrientedProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image:
    linear-gradient(
      ${({ $vertical }) => ($vertical ? "0deg" : "90deg")},
      ${appBgColor} 0%,
      color-mix(in oklab, var(--muted) 10%, transparent) 10%,
      color-mix(in oklab, var(--muted) 10%, transparent) 90%,
      ${appBgColor} 100%
    ),
    radial-gradient(
      color-mix(in oklab, var(--muted) 20%, transparent) 0%,
      ${appBgColor} 50%,
      ${appBgColor} 100%
    );
  box-shadow: 0 0 12px 12px ${appBgColor} inset;
  ${({ $vertical }) =>
    $vertical
      ? css`
          width: 100%;
          flex-direction: column;
          justify-content: center;
        `
      : css`
          height: 100%;
        `}
`;

export const Grab = styled.div<OrientedProps>`
  flex: none;
  position: relative;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.35px;
  user-select: none;
  z-index: 4;
  border: transparent solid 1px;

  ${({ $vertical }) =>
    $vertical
      ? css`
          width: 100%;
          height: 100%;
          align-self: center;
        `
      : css`
          width: 100%;
          height: 100%;
          align-self: center;
        `}

  &:active {
    cursor: grabbing;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    ${({ $vertical }) =>
      $vertical
        ? css`
            width: 30%;
            height: 80%;
          `
        : css`
            width: 80%;
            height: 30%;
          `}
    border-radius: 99px;
    overflow: hidden;
    background-size: 4px 4px;
    pointer-events: none;
    transition: opacity 0.5s ease;
  }

  &::before {
    background-image: radial-gradient(
      rgba(255, 255, 255, 1) 0.7px,
      transparent 0.7px
    );
    opacity: 0.3;
  }

  &::after {
    background-image: radial-gradient(rgb(255, 88, 16) 1px, transparent 1px);
    opacity: 0;
  }

  &:hover:not(.is-dragging):not(.range-dragging *),
  &:active,
  &.is-dragging {
    &::before {
      opacity: 0;
      transition: opacity 0s;
    }
    &::after {
      opacity: 0.75;
      transition: opacity 0s;
    }
  }
`;
