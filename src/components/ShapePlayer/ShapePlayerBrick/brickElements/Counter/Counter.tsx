import { useEffect, useRef, useState } from "react";
import { useMetronomeStore } from "@/store";
import * as S from "./parts";
import { useCounter } from "./useCounter";
import { Minus, Plus } from "lucide-react";

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

  const previousLengthRef = useRef(playLength);

  const [animationVersion, setAnimationVersion] = useState(0);

  useEffect(() => {
    if (previousLengthRef.current !== playLength) {
      previousLengthRef.current = playLength;

      requestAnimationFrame(() => {
        setAnimationVersion((v) => v + 1);
      });
    }
  }, [playLength]);

  const renderBeatIndicator = (_: unknown, index: number) => {
    const isPartActive =
      isCurrentBrickPlayed && activeBeatIndex === index && isPlaying;

    const isLast = index === playLength - 1;

    return (
      <S.BeatIndicator key={index} $isActive={isPartActive}>
        <S.BeatText
          key={
            isLast ? `last-${animationVersion}-${playLength}` : `text-${index}`
          }
        >
          {index + 1}
        </S.BeatText>
      </S.BeatIndicator>
    );
  };

  return (
    <S.CounterWrapper>
      <S.ControlButton onClick={handleDecrement} disabled={isDecrementDisabled}>
        <Minus />
      </S.ControlButton>

      <S.BeatsContainer>
        {Array.from({ length: playLength }).map(renderBeatIndicator)}
      </S.BeatsContainer>

      <S.ControlButton onClick={handleIncrement} disabled={isIncrementDisabled}>
        <Plus />
      </S.ControlButton>
    </S.CounterWrapper>
  );
};
