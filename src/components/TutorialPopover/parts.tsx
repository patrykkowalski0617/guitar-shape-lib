import styled, { keyframes } from "styled-components";

interface IconWrapperProps {
  $x: number;
  $y: number;
  $animationOrder: number;
}

const shadowShine = keyframes`
    0%{
        filter: drop-shadow(0px 0px 0px var(--secondary)) brightness(1) blur(0px);
    }
    50%{
        filter: drop-shadow(0px 0px 2px var(--secondary)) brightness(1.5) blur(0.3px);
    }
    100%{
        filter: drop-shadow(0px 0px 0px var(--secondary)) brightness(1) blur(0px);
    }
`;

export const IconWrapper = styled.div<IconWrapperProps>`
  display: inline-flex;
  cursor: pointer;
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  text-shadow: 0 0 8px;
  animation: ${shadowShine} 700ms ${({ $animationOrder }) => $animationOrder * 500}ms forwards;
  opacity: 0.6;
`;
