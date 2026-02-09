import { type JSX, type CSSProperties } from "react";
import * as S from "./parts";

type ColorDotsProps = {
  colors: [CSSProperties["color"], CSSProperties["color"], CSSProperties["color"]];
  size?: number;
  gap?: number;
};

export default function ColorDots({ colors, size = 12 }: ColorDotsProps): JSX.Element {
  return (
    <S.DotsContainer>
      <S.Dot $color={colors[0]} $size={size} />
      <S.Dot $color={colors[1]} $size={size} />
      <S.Dot $color={colors[2]} $size={size} />
    </S.DotsContainer>
  );
}
