import { useMetronomeStore } from "@/store";
import * as S from "./parts";
import { useCounter } from "./useCounter";

export interface CounterProps {
  id: string;
  playLength: number;
  isCurrentBrickPlayed: boolean;
  activeBeatIndex: number | undefined;
}

export const Counter = ({
  id,
  playLength,
  isCurrentBrickPlayed,
  activeBeatIndex,
}: CounterProps) => {
  const {
    handleIncrement,
    handleDecrement,
    isDecrementDisabled,
    isIncrementDisabled,
  } = useCounter(id, playLength);
  const isPlaying = useMetronomeStore((s) => s.isPlaying);

  return (
    <S.CounterWrapper>
      <S.ControlButton onClick={handleDecrement} disabled={isDecrementDisabled}>
        -
      </S.ControlButton>

      <S.BeatsContainer>
        {Array.from({ length: playLength }).map((_, index) => {
          const isPartActive =
            isCurrentBrickPlayed && activeBeatIndex === index && isPlaying;

          return <S.BeatIndicator key={index} $isActive={isPartActive} />;
        })}
      </S.BeatsContainer>

      <S.ControlButton onClick={handleIncrement} disabled={isIncrementDisabled}>
        +
      </S.ControlButton>
    </S.CounterWrapper>
  );
};
