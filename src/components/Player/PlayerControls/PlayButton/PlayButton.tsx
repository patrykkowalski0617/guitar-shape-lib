import { useEffect } from "react";
import { Play, Square } from "lucide-react";
import * as S from "./parts";
import { usePlayerStore } from "@/store";
import { useWakeLock } from "@/hooks";
import { playerIconSize } from "../../constants";
import { useCloseEdit } from "@/components/Player/PlayerBricksControls/CloseEditButton/hooks/useCloseEdit";

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
      variant={"playerSolid"}
      $isPlaying={isPlaying}
      onClick={handleClick}
      $bpm={bpm}
    >
      {isCountingIn ? (
        countIn
      ) : isPlaying ? (
        <Square
          size={playerIconSize}
          fill="currentColor"
          stroke="var(--background)"
          strokeWidth={1}
        />
      ) : (
        <Play
          size={playerIconSize}
          fill="currentColor"
          stroke="var(--background)"
          strokeWidth={1}
        />
      )}
    </S.PlayButton>
  );
};
