import styled, { css } from "styled-components";

export const FretWrapper = styled.div`
  position: relative;
  flex: 1 1 0;
  height: 32px;
  padding: 1px 4px;
`;

export const Fret = styled.div<{
  $isBaseChordShapeNote: boolean;
  $isVisibleString: boolean;
}>`
  height: 100%;
  width: 100%;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 32;
  ${({ $isVisibleString }) =>
    $isVisibleString
      ? css`
          &::before {
            content: "";
            transform: scale(1.1);
            z-index: 32;
            position: absolute;
            inset: 0;
            border-radius: 12px;
            opacity: 0;
          }
        `
      : ""}

  ${({ $isBaseChordShapeNote }) => {
    if (!$isBaseChordShapeNote) return null;
    return css`
      &::before {
        opacity: 1;
        transform: scale(1);
        background: var(--muted);
        box-shadow:
          3px 3px 3px 0px color-mix(in oklab, hsl(0, 0%, 2%) 70%, transparent),
          inset 0.5px 0.5px 1px rgba(255, 255, 255, 0.35),
          inset -1px -1px 2px rgba(0, 0, 0, 0.22);
        border: 1px solid
          color-mix(in oklab, var(--foreground) 10%, transparent);
      }
    `;
  }}
`;

export const Note = styled.div<{
  $isVisible: boolean;
  $isVisibleString: boolean;
}>`
  ${({ $isVisibleString }) =>
    $isVisibleString
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `}
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 52;
`;

export const NutShadow = styled.div`
  width: 16px;
  position: absolute;
  border-radius: 4px;
  right: -1.5px;
  top: 8px;
  height: calc(600% - 14px);
  background-image: linear-gradient(
    180deg,
    color-mix(in oklab, var(--instrument) 20%, hsl(0, 0%, 2%)) 0%,
    color-mix(in oklab, var(--foreground) 0%, transparent) 40%,
    color-mix(in oklab, var(--instrument) 20%, hsl(0, 0%, 2%)) 100%
  );
  opacity: 0.6;
  z-index: 21;
`;
