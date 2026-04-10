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

const tickOpacity = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Tick = styled.div<{
  $isUserList: boolean;
  $isHighlighted: boolean;
  $isOpacityAnimationLocked: boolean;
  $opacityAnimationDuration: number;
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
  ${({
    $isHighlighted,
    $isOpacityAnimationLocked,
    $opacityAnimationDuration,
  }) => {
    if ($isHighlighted) {
      return css`
        animation: ${highlightAnimation} 0.6s ease-in-out forwards;
        z-index: 10;
      `;
    } else if (!$isOpacityAnimationLocked) {
      return css`
        opacity: 0;
        animation: ${tickOpacity} ${$opacityAnimationDuration}ms
          ${$opacityAnimationDuration}ms forwards;
      `;
    }
  }}
`;

export const ShapeExplorerWrapper = styled.div<{ $isDisabled: boolean }>`
  margin: 0 auto;
  max-width: 0px;
  transition: 0.5s;
  transform: translateX(calc(25px / -2));
  ${({ $isDisabled }) => {
    if ($isDisabled) return;
    return css`
      transform: none;
      max-width: 430px;
    `;
  }}
`;
