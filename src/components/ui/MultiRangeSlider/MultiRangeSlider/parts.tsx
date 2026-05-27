import styled, { css } from "styled-components";
import { apearingTransition } from "../../constants";
import { grabStyle } from "../../tokens";

export const grabSize = 50;

export const Wrapper = styled.div<{
  $vertical?: boolean;
  $isDisabled: boolean;
}>`
  position: relative;
  overflow: visible;
  padding: ${({ $vertical }) =>
    $vertical ? `${grabSize}px 0` : `0 ${grabSize}px`};
  transition: opacity ${apearingTransition};
  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          opacity: 0;
          pointer-events: none;
        `
      : css``};
`;

export const Track = styled.div<{
  $vertical?: boolean;
}>`
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

export const ActiveRange = styled.div<{
  $vertical?: boolean;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: radial-gradient(
    color-mix(in oklab, var(--muted) 10%, transparent) 0%,
    transparent 50%,
    transparent 100%
  );
  ${({ $vertical }) =>
    $vertical
      ? css`
          width: 100%;
          flex-direction: column;
          justify-content: center;
        `
      : css`
          height: 100%;
        `};
`;

export const Grab = styled.div<{
  $vertical?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.35px;
  user-select: none;
  z-index: 4;

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
  ${grabStyle}
  &::before,
  &::after {
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
  }
`;
