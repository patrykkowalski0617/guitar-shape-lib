import { KeySelect } from "./KeySelect/KeySelect";
import { ModeAndRoleSelect } from "./ModeAndRoleSelect/ModeAndRoleSelect";
import * as S from "./parts";
import PianoToggleButton from "./PianoToggleButton/PianoToggleButton";
import { ShapeSelect } from "./ShapeSelect/ShapeSelect";

export default function Controls() {
  return (
    <S.ControlContainer>
      <S.ControlSection>
        <KeySelect />
        <ModeAndRoleSelect />
        <ShapeSelect />
      </S.ControlSection>
      <S.ControlSection>
        <PianoToggleButton />
      </S.ControlSection>
    </S.ControlContainer>
  );
}
