import styled from "styled-components";
import { type JSX } from "react";

type ColorDotsProps = {
  colors: [React.CSSProperties["color"], React.CSSProperties["color"], React.CSSProperties["color"]];
  size?: number;
  gap?: number;
};

const DotsContainer = styled.div<{ $gap: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap}px;
  padding: 0;
  margin: 0;
`;

const Dot = styled.div<{ $color: React.CSSProperties["color"]; $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
  flex-shrink: 0;
`;

export default function ColorDots({ colors, size = 12, gap = 8 }: ColorDotsProps): JSX.Element {
  return (
    <DotsContainer $gap={gap}>
      <Dot $color={colors[0]} $size={size} />
      <Dot $color={colors[1]} $size={size} />
      <Dot $color={colors[2]} $size={size} />
    </DotsContainer>
  );
}
