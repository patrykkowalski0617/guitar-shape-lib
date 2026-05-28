import {
  BpmInput,
  BpmMultiplier,
  ExerciseTitle,
  FullscreenButton,
  Metronome,
  Open,
  Save,
} from "./headerElements";
import { PlaybackSelect } from "./headerElements/PlaybackSelect/PlaybackSelect";
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

      <PlaybackSelect />

      <FullscreenButton />
    </S.ShapePlayerControllers>
  );
};
