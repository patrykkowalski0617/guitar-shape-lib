import * as S from "./parts";
import BaseChordToggle from "./BaseChordToggle/BaseChordToggle";
import ShapeSelect from "./ShapeSelect/ShapeSelect";
import ShapeCarousel from "./ShapeCarousel/ShapeCarousel";

export default function ShapeControls() {
  return (
    <S.Wrapper>
      <ShapeCarousel />
      <S.BaseChordToggleWrapper>
        <BaseChordToggle />
        <ShapeSelect />
      </S.BaseChordToggleWrapper>
    </S.Wrapper>
  );
}
