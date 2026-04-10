import styled, { css, keyframes } from "styled-components";

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
  opacity: 0;
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

export const ShapeExplorerWrapper = styled.div<{ $isDisabled: boolean }>`
  margin: 0 auto;
  max-width: 0px;
  transform: translateX(calc(25px / -2));
  transition: 0.3s;
  ${({ $isDisabled }) => {
    if ($isDisabled) return;
    return css`
      max-width: 430px;
      ${Tick} {
        opacity: 1;
      }
    `;
  }}
`;
