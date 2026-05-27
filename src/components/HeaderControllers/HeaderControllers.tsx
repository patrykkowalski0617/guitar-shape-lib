import {
  BpmInput,
  BpmMultiplier,
  ExerciseTitle,
  FullscreenButton,
  Metronome,
  TogglePlayback,
  Open,
  Save,
  ToggleBass,
} from "./headerElements";

import * as S from "./parts";

export const HeaderControllers = () => {
  return (
    <S.ShapePlayerControllers>
      <ExerciseTitle />
      <Open />
      <Save />

      <Metronome />
      <BpmInput />
      <BpmMultiplier />

      <TogglePlayback />
      <ToggleBass />

      <FullscreenButton />
    </S.ShapePlayerControllers>
  );
};
