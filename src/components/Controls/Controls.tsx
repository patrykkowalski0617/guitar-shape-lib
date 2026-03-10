import { KeySelect } from "./KeySelect/KeySelect";
import { ShapeSelect } from "./ShapeSelect/ShapeSelect";
import * as S from "./parts";

export default function Controls() {
  return (
    <S.ControlContainer>
      <KeySelect />

      <ShapeSelect />
    </S.ControlContainer>
  );
}
