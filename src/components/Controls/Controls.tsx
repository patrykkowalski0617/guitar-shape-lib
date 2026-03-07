import { AddToList } from "./AddToList/AddToList";
import { FullscreenButton } from "./FullscreenButtons/FullscreenButtons";
import { KeySelect } from "./KeySelect/KeySelect";
import { ModeAndRoleSelect } from "./ModeAndRoleSelect/ModeAndRoleSelect";
import * as S from "./parts";
import PianoToggleButton from "./PianoToggleButton/PianoToggleButton";
import { ShapeSelect } from "./ShapeSelect/ShapeSelect";

export default function Controls() {
  return (
    <S.ControlContainer>
      <KeySelect />
      <ModeAndRoleSelect />
      <ShapeSelect />
      <PianoToggleButton />
      <AddToList />
      <FullscreenButton />
    </S.ControlContainer>
  );
}
