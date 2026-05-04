import * as S from "./parts";
import BaseChordToggle from "./BaseChordToggle/BaseChordToggle";
import ShapeSelect from "./ShapeSelect/ShapeSelect";
import { NoteMatrix } from "./NoteMatrix/NoteMatrix";

export default function ShapeControls() {
  return (
    <S.Wrapper>
      <S.BaseChordToggleWrapper>
        <BaseChordToggle />
        <ShapeSelect />
      </S.BaseChordToggleWrapper>
      <NoteMatrix />
    </S.Wrapper>
  );
}
