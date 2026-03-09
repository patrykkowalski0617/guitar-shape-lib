import styled, { css, keyframes } from "styled-components";

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

const highlightAnimation = keyframes`
  0% { 
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 0px transparent;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.4);
    box-shadow: 0 0 8px 4px var(--accent);
  }
  100% { 
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 0px transparent;
  }
`;

export const Tick = styled.div<{
  $isUserList: boolean;
  $isHighlighted: boolean;
}>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;

  background-color: ${({ $isUserList }) =>
    $isUserList
      ? "var(--accent)"
      : "color-mix(in oklab, var(--muted) 80%, var(--foreground))"};

  box-shadow: ${({ $isUserList }) =>
    $isUserList ? "0 0 8px var(--accent)" : "none"};

  transition: all 0.6s ease-in-out;

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      animation: ${highlightAnimation} 0.6s ease-in-out 1;
      z-index: 10;
    `}
`;
