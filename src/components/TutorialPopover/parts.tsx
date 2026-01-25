import styled from "styled-components";

interface IconWrapperProps {
  $x: number;
  $y: number;
  $animationOrder: number;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  display: inline-flex;
  cursor: pointer;
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  text-shadow: 0 0 8px;
  background: var(--background);
  border-radius: 20px;
  box-shadow: 0 0 10px 5px var(--background);
  &:hover {
    filter: brightness(1.5);
  }
`;
