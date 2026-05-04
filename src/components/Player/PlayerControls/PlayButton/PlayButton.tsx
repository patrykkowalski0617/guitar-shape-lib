import { useEffect } from "react";
import { Metronome } from "lucide-react";
import * as S from "./parts";
import { usePlayerStore } from "@/store";
import { useWakeLock } from "@/hooks";
import { playerIconSize } from "../../constants";
import { useCloseEdit } from "@/components/Player/hooks/useCloseEdit";

export const PlayButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isCountingIn = usePlayerStore((state) => state.isCountingIn);
  const countIn = usePlayerStore((state) => state.countIn);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const bpm = usePlayerStore((state) => state.bpm);
  const { closeEdit } = useCloseEdit();

  const { toggleWakeLock, isActive } = useWakeLock();

  useEffect(() => {
    if (isPlaying !== isActive) {
      toggleWakeLock();
    }
  }, [isPlaying, isActive, toggleWakeLock]);

  const handleClick = () => {
    closeEdit();
    togglePlay();
  };

  return (
    <S.PlayButton
      $isPlaying={isPlaying}
      $bpm={bpm}
      variant={"playerSolid"}
      onClick={handleClick}
    >
      {isCountingIn ? (
        countIn
      ) : (
        <Metronome
          size={playerIconSize}
          stroke="var(--background)"
          strokeWidth={2.5}
        />
      )}
    </S.PlayButton>
  );
};
