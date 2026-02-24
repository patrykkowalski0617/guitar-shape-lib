import styled, { css } from "styled-components";

export const ShapeExplorerWrapper = styled.div<{ $isVisible: boolean }>`
  margin: 8px auto 0;
  transition:
    opacity 0.1s ease-in-out,
    transform 0.1s ease-in-out,
    max-height 0.1s ease-in-out,
    margin 0.1s ease-in-out;
  will-change: transform, opacity, max-height;
  ${({ $isVisible }) =>
    $isVisible
      ? css`
          opacity: 1;
          transform: translateY(0) scale(1);
          max-height: 35px;
        `
      : css`
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          max-height: 0;
          margin-top: 0;
          overflow-y: hidden;
        `}
  @media (min-width: 768px) {
    width: calc(100% - 100px);
  }
`;
