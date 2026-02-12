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
      <S.ColorContainer>
        T <S.Dot $color={colors[0]} $size={size} />
      </S.ColorContainer>
      <S.ColorContainer>
        S <S.Dot $color={colors[1]} $size={size} />
      </S.ColorContainer>
      <S.ColorContainer>
        D <S.Dot $color={colors[2]} $size={size} />
      </S.ColorContainer>
    </S.DotsContainer>
  );
}
