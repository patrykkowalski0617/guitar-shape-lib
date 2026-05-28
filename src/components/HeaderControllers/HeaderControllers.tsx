import { useMediaQuery } from "@/hooks/useMediaQuery";
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
  const isMobileLayout = useMediaQuery("(max-width: 1400px)");

  return (
    <>
      {isMobileLayout && (
        <S.ExerciseTitleMobileWrapper>
          <ExerciseTitle />
        </S.ExerciseTitleMobileWrapper>
      )}
      <S.ShapePlayerControllers>
        {!isMobileLayout && <ExerciseTitle />}
        <Open />
        <Save />

        <Metronome />
        <BpmInput />
        <BpmMultiplier />

        <PlaybackSelect />

        <FullscreenButton />
      </S.ShapePlayerControllers>
    </>
  );
};
