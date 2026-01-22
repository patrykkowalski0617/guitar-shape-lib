import styled, { keyframes } from "styled-components";

interface IconWrapperProps {
  $x: number;
  $y: number;
  $animationOrder: number;
}

const shadowShine = keyframes`
    0%{
        filter: drop-shadow(0px 0px 0px var(--secondary));
    }
    50%{
        filter: drop-shadow(0px 0px 4px var(--secondary));
    }
    100%{
        filter: drop-shadow(0px 0px 0px var(--secondary));
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
