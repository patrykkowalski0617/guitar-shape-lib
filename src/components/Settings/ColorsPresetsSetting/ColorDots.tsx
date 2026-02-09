import { type JSX, type CSSProperties } from "react";
import * as S from "./parts";

type ColorDotsProps = {
  colors: [CSSProperties["color"], CSSProperties["color"], CSSProperties["color"]];
  size?: number;
  gap?: number;
};

export default function ColorDots({ colors, size = 12, gap = 8 }: ColorDotsProps): JSX.Element {
  return (
    <S.DotsContainer $gap={gap}>
      <S.Dot $color={colors[0]} $size={size} />
      <S.Dot $color={colors[1]} $size={size} />
      <S.Dot $color={colors[2]} $size={size} />
    </S.DotsContainer>
  );
}
