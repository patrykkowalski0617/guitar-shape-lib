import {
  Add,
  Clear,
  Metronome,
  Undo,
  Save,
  Open,
  TogglePlayback,
  BpmInput,
  BpmMultiplier,
} from "./headerElements";
import * as S from "./parts";
import { ExerciseTitle } from "./headerElements/ExerciseTitle/ExerciseTitle";

export const ShapePlayerHeader = () => {
  return (
    <>
      <S.ShapePlayerControllers>
        <Open />
        <Save />
        <ExerciseTitle />
        <Add />
        <Clear />
        <Undo />
        <TogglePlayback />
        <Metronome />
        <BpmInput />
        <BpmMultiplier />
      </S.ShapePlayerControllers>
    </>
  );
};
