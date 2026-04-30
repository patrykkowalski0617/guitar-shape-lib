import styled, { css, keyframes } from "styled-components";
import { shapeExplorerCommon } from "../../constants";

const highlightAnimation = keyframes`
  0% { 
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 0px transparent;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.2);
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
  $isUserList?: boolean;
  $isHighlighted?: boolean;
  $isOpacityAnimationLocked?: boolean;
  $opacityAnimationDuration: number;
}>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $isUserList }) =>
    $isUserList
      ? "radial-gradient(circle,var(--foreground) 0%, var(--secondary) 100%)"
      : "radial-gradient(circle,var(--accent) 0%, var(--muted) 100%)"};

  box-shadow: ${({ $isUserList }) =>
    $isUserList
      ? "0 0 8px var(--secondary), 0 0 12px var(--secondary)"
      : "2px 2px 8px 2px var(--background)"};
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
  max-width: 0px;
  transition: 0.5s;
  transform: translateX(calc(25px / -2));
  padding: 0 7px;
  opacity: 0;
  ${shapeExplorerCommon}
  ${({ $isDisabled }) => {
    if ($isDisabled) return;
    return css`
      transform: none;
      max-width: 500px;
      flex: 1;
      opacity: 1;
    `;
  }}
`;
