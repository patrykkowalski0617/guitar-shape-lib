import styled, { css, keyframes } from "styled-components";
import { grabSize, type OrientedProps } from "./parts";

const LIGHT_DIR = { x: -1, y: -1 } as const;

const INSET_HIGHLIGHT = {
  dist: 1,
  blur: 0,
  alpha: 0.18,
};

const INSET_SHADOW = {
  dist: 1,
  blur: 2,
  alpha: 0.5,
};

const DROP_CLOSE = {
  dist: 3,
  blur: 3,
  alpha: 0.45,
};

const DROP_FAR = {
  dist: 9,
  blur: 10,
  alpha: 0.22,
};

const rotateLight = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(-rad);
  const sin = Math.sin(-rad);
  return {
    lx: LIGHT_DIR.x * cos - LIGHT_DIR.y * sin,
    ly: LIGHT_DIR.x * sin + LIGHT_DIR.y * cos,
  };
};

const px = (n: number) => `${n.toFixed(2)}px`;

const correctedInsetShading = (deg: number) => {
  const { lx, ly } = rotateLight(deg);

  const hx = px(-lx * INSET_HIGHLIGHT.dist);
  const hy = px(-ly * INSET_HIGHLIGHT.dist);
  const sx = px(lx * INSET_SHADOW.dist);
  const sy = px(ly * INSET_SHADOW.dist);

  return css`
    box-shadow:
      inset ${hx} ${hy} ${INSET_HIGHLIGHT.blur}px
        rgba(255, 255, 255, ${INSET_HIGHLIGHT.alpha}),
      inset ${sx} ${sy} ${INSET_SHADOW.blur}px
        rgba(0, 0, 0, ${INSET_SHADOW.alpha});
  `;
};

const correctedDropShadow = (deg: number) => {
  const { lx, ly } = rotateLight(deg);

  const ox = (dist: number) => px(-lx * dist);
  const oy = (dist: number) => px(-ly * dist);

  return css`
    filter: drop-shadow(
        ${ox(DROP_CLOSE.dist)} ${oy(DROP_CLOSE.dist)} ${DROP_CLOSE.blur}px
          rgba(0, 0, 0, ${DROP_CLOSE.alpha})
      )
      drop-shadow(
        ${ox(DROP_FAR.dist)} ${oy(DROP_FAR.dist)} ${DROP_FAR.blur}px
          rgba(0, 0, 0, ${DROP_FAR.alpha})
      );
  `;
};

const correctedShading = (deg: number) => css`
  ${correctedInsetShading(deg)}
  ${correctedDropShadow(deg)}
`;

const glowPulse = keyframes`
  0% {
    filter:
      brightness(1.0) saturate(1.1)
      drop-shadow(0px 0px 8px  rgba(220, 74, 55, 0.69))
      drop-shadow(0px 0px 18px rgba(195, 55, 35, 0.26));

  }
  100% {
    filter:
      brightness(1.11) saturate(1.28)
      drop-shadow(0px 0px 16px rgb(234, 69, 44))
      drop-shadow(0px 0px 30px rgba(200, 48, 28, 0.40));

  }
`;

const glowEffect = css`
  color: #ffe0c8;
  outline: #c5301c solid 1px;
  animation: ${glowPulse} 6s ease-in-out forwards;
`;

export const PickHandle = styled.div<OrientedProps>`
  position: absolute;
  z-index: 9;
  user-select: none;
  touch-action: none;
  background: radial-gradient(rgb(32, 32, 32) 0%, rgb(50, 50, 50) 100%);
  transition: 3s ease;
  outline: transparent solid 1px;
  &.is-dragging {
    transition: none !important;
  }
  &:hover:not(.is-dragging):not(.range-dragging *),
  &:active,
  &.is-dragging {
    ${glowEffect}
  }

  border-top-left-radius: 70%;
  border-top-right-radius: 55% 100%;
  border-bottom-right-radius: calc(${grabSize}px / 4);
  border-bottom-left-radius: 100% 55%;

  ${({ $vertical }) =>
    $vertical
      ? css`
          width: 100%;
          height: ${grabSize}px;
          cursor: ns-resize;

          &:first-child {
            top: -${grabSize}px;
            transform: rotate(60deg);
            ${correctedShading(60)}
          }

          &:last-child {
            bottom: -${grabSize}px;
            transform: rotate(-120deg);
            ${correctedShading(-120)}
          }
        `
      : css`
          width: ${grabSize}px;
          height: 100%;
          cursor: ew-resize;

          &:first-child {
            left: -${grabSize}px;
            transform: rotate(-30deg);
            ${correctedShading(-30)}
          }

          &:last-child {
            right: -${grabSize}px;
            transform: rotate(150deg);
            ${correctedShading(150)}
          }
        `}
`;
