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

      <TogglePlayback />
      <ToggleBass />
      <Metronome />
      <BpmInput />
      <BpmMultiplier />

      <FullscreenButton />
    </S.ShapePlayerControllers>
  );
};
