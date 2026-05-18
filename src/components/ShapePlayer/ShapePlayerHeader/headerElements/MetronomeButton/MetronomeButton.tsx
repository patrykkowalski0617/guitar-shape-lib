import { useEffect } from "react";
import { Metronome } from "lucide-react";
import * as S from "./parts";
import { useMetronomeStore } from "@/store";
import { useWakeLock } from "@/hooks";

export const MetronomeButton = () => {
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const isCountingIn = useMetronomeStore((state) => state.isCountingIn);
  const countIn = useMetronomeStore((state) => state.countIn);
  const togglePlay = useMetronomeStore((state) => state.togglePlay);
  const bpm = useMetronomeStore((state) => state.bpm);

  const { toggleWakeLock, isActive } = useWakeLock();

  useEffect(() => {
    if (isPlaying !== isActive) {
      toggleWakeLock();
    }
  }, [isPlaying, isActive, toggleWakeLock]);

  const handleClick = () => {
    togglePlay();
  };

  return (
    <S.PlayButton $isPlaying={isPlaying} $bpm={bpm} onClick={handleClick}>
      {isCountingIn ? (
        countIn
      ) : (
        <Metronome stroke="var(--background)" strokeWidth={2.5} />
      )}
    </S.PlayButton>
  );
};
