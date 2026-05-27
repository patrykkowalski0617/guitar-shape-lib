import { useEffect } from "react";
import { Metronome as MetronomeIcon } from "lucide-react";
import * as S from "./parts";
import { useMetronomeStore } from "@/store";
import { useWakeLock } from "@/hooks";

export const Metronome = () => {
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const isCountingIn = useMetronomeStore((s) => s.isCountingIn);
  const countIn = useMetronomeStore((s) => s.countIn);
  const togglePlay = useMetronomeStore((s) => s.togglePlay);
  const bpm = useMetronomeStore((s) => s.bpm);

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
        <MetronomeIcon stroke="var(--background)" strokeWidth={2.5} />
      )}
    </S.PlayButton>
  );
};
