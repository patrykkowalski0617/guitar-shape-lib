import * as S from "../ShapeControls/parts";
import { NoteMatrix } from "../NoteMatrix/NoteMatrix";
import BaseChordToggle from "./BaseChordToggle/BaseChordToggle";
import ShapeSelect from "./ShapeSelect/ShapeSelect";
import ShapeCarousel from "./ShapeList/ShapeList";

export default function ShapeControls() {
  return (
    <S.Wrapper>
      <S.BaseChordToggleWrapper>
        <BaseChordToggle />
        <ShapeSelect />
      </S.BaseChordToggleWrapper>
      <ShapeCarousel />
      <NoteMatrix />
    </S.Wrapper>
  );
}
