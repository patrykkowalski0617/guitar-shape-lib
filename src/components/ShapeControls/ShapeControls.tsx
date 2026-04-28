import * as S from "./parts";
import BaseChordToggle from "./BaseChordToggle/BaseChordToggle";
import ShapeSelect from "./ShapeSelect/ShapeSelect";

export default function ShapeControls() {
  return (
    <S.ControlWrapper>
      <BaseChordToggle />
      <ShapeSelect />
    </S.ControlWrapper>
  );
}
