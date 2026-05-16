import {
  AddButton,
  ClearButton,
  MetronomeButton,
  UndoButton,
  Save,
  Open,
} from "./buttons";
import * as S from "./parts";

export const ShapePlayerHeader = () => (
  <S.ShapePlayerHeaderWrapper>
    <AddButton />
    <ClearButton />
    <UndoButton />
    <MetronomeButton />
    <Save />
    <Open />
  </S.ShapePlayerHeaderWrapper>
);
