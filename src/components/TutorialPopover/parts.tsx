import styled from "styled-components";

interface IconWrapperProps {
  $x: number;
  $y: number;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  display: inline-flex;
  cursor: pointer;
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  background: var(--background);
  border-radius: 20px;
  &:hover {
    filter: brightness(1.5);
  }
`;
