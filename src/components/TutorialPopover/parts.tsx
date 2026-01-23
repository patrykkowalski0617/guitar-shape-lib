import styled, { keyframes } from "styled-components";

interface IconWrapperProps {
  $x: number;
  $y: number;
  $animationOrder: number;
}

const shadowShine = keyframes`
    0% {
        filter: drop-shadow(0px 0px 0px var(--secondary)) brightness(1) blur(0px);
    }
    50% {
        filter: drop-shadow(0px 0px 2px var(--secondary)) brightness(1.5) blur(0.3px);
    }
    100% {
        filter: drop-shadow(0px 0px 0px var(--secondary)) brightness(1) blur(0px);
    }
`;

export const IconWrapper = styled.div<IconWrapperProps>`
  display: inline-flex;
  cursor: pointer;
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  opacity: 0.6;
  text-shadow: 0 0 8px;
  will-change: filter;
  animation: ${shadowShine} 700ms ${({ $animationOrder }) => $animationOrder * 500}ms forwards;
  &:hover {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
  }
`;
