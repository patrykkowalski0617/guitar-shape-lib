import * as S from "../ShapeControls/parts";
import { NoteMatrix } from "./NoteMatrix/NoteMatrix";
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
      <NoteMatrix />
    </S.Wrapper>
  );
}
