import { useMetronomeStore } from "@/store";
import * as S from "./parts";

export interface CounterProps {
  playLength: number;
  isCurrentBrickPlayed: boolean;
  activeBeatIndex: number | undefined;
}

export const Counter = ({
  playLength,
  isCurrentBrickPlayed,
  activeBeatIndex,
}: CounterProps) => {
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  return (
    <S.CounterWrapper>
      {Array.from({ length: playLength }).map((_, index) => {
        const isPartActive =
          isCurrentBrickPlayed && activeBeatIndex === index && isPlaying;

        return <S.BeatIndicator key={index} $isActive={isPartActive} />;
      })}
    </S.CounterWrapper>
  );
};
