import styled, { css, keyframes } from "styled-components";

export const ShapeExplorerWrapper = styled.div`
  width: 350px;
`;

const highlightAnimation = keyframes`
  0% { 
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 0px transparent;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.4);
    box-shadow: 0 0 8px 4px var(--secondary);
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
      ? "var(--secondary)"
      : "color-mix(in oklab, var(--muted) 80%, var(--foreground))"};

  box-shadow: ${({ $isUserList }) =>
    $isUserList ? "0 0 8px var(--secondary)" : "none"};

  transition: all 0.6s ease-in-out;

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      animation: ${highlightAnimation} 0.6s ease-in-out 1;
      z-index: 10;
    `}
`;
