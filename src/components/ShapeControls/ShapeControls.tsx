import * as S from "./parts";
import BaseChordToggle from "./BaseChordToggle/BaseChordToggle";
import ShapeSelect from "./ShapeSelect/ShapeSelect";
import { Separator } from "./Separator";
import { CleanButton } from "./CleanButton/CleanButton";

export default function ShapeControls() {
  return (
    <S.ControlWrapper>
      <BaseChordToggle />
      <S.BottomRow>
        <CleanButton />
        <Separator />
        <ShapeSelect />
      </S.BottomRow>
    </S.ControlWrapper>
  );
}
