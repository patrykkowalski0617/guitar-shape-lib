import styled, { css } from "styled-components";

export const FretWrapper = styled.div`
  position: relative;
  flex: 1 1 0;
  height: 32px;
  padding: 1px 7px;
`;

export const Fret = styled.div<{
  $isLockedNote: boolean;
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
            transition:
              opacity 0.1s ease-out,
              transform 0.1s ease-out;
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
        background: color-mix(in oklab, var(--muted) 80%, var(--background));
        box-shadow: 3px 3px 3px 0px
          color-mix(in oklab, var(--background) 70%, transparent);
        border: 1px solid
          color-mix(in oklab, var(--foreground) 10%, transparent);
      }
    `;
  }}

  ${({ $isLockedNote }) => {
    if (!$isLockedNote) return null;

    return css`
      /* outline: 2px solid var(--secondary-foreground);
      padding: 2px; */
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
