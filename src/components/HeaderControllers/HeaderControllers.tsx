import {
  BpmInput,
  BpmMultiplier,
  ExerciseTitle,
  Metronome,
  TogglePlayback,
  Open,
  Save,
  Undo,
} from "./headerElements";

import * as S from "./parts";

export const HeaderControllers = () => {
  return (
    <S.ShapePlayerControllers>
      <Open />
      <Save />
      <ExerciseTitle />
      <Undo />
      <TogglePlayback />
      <Metronome />
      <BpmInput />
      <BpmMultiplier />
    </S.ShapePlayerControllers>
  );
};
