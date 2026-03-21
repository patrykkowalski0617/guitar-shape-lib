import * as S from "./parts";
import TuneSlider from "./TuneSlider/TuneSlider";
import BaseChordToggle from "./BaseChordToggle/BaseChordToggle";
import ShapeSelect from "./ShapeSelect/ShapeSelect";

export default function ShapeControls() {
  return (
    <S.ControlWrapper>
      <TuneSlider />
      <BaseChordToggle />
      <ShapeSelect />
    </S.ControlWrapper>
  );
}
