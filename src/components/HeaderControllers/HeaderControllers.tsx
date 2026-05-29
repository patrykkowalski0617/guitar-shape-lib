import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Add,
  BpmInput,
  BpmMultiplier,
  ExerciseTitle,
  Metronome,
} from "./headerElements";
import * as S from "./parts";

export const HeaderControllers = () => {
  const isMobileLayout = useMediaQuery("(max-width: 1000px)");

  return (
    <>
      {isMobileLayout && (
        <S.ExerciseTitleMobileWrapper>
          <ExerciseTitle />
        </S.ExerciseTitleMobileWrapper>
      )}
      <S.ShapePlayerControllers>
        {!isMobileLayout && <ExerciseTitle />}
        <Add />

        <Metronome />
        <BpmInput />
        <BpmMultiplier />
      </S.ShapePlayerControllers>
    </>
  );
};
