import { AddToList } from "./AddToList/AddToList";
import { KeySelect } from "./KeySelect/KeySelect";
import { ModeAndRoleSelect } from "./ModeAndRoleSelect/ModeAndRoleSelect";
import * as S from "./parts";
import { ShapeSelect } from "./ShapeSelect/ShapeSelect";

export default function Controls() {
  return (
    <S.ControlContainer>
      <KeySelect />
      <ModeAndRoleSelect />
      <ShapeSelect />
      <AddToList />
    </S.ControlContainer>
  );
}
