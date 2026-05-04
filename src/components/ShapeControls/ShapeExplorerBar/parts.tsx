import styled, { css } from "styled-components";

export const ShapeExplorerBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const PlayerWrapper = styled.div<{ $isDisabled: boolean }>`
  interpolate-size: allow-keywords;

  transition:
    width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s ease,
    transform 0.3s ease,
    visibility 0.4s;

  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          width: 0;
          height: 0;
          opacity: 0;
          transform: scale(0.95);
          overflow: hidden;
          visibility: hidden;
          pointer-events: none;
        `
      : css`
          width: auto;
          height: auto;
          opacity: 1;
          transform: scale(1);
          visibility: visible;
          pointer-events: all;
        `}
`;
