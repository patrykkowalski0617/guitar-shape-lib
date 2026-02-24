import { Play, Square } from "lucide-react";
import * as S from "./parts";
import { usePlayerStore } from "@/store";

export const PlayButton = ({ onCloseEdit }: { onCloseEdit: () => void }) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isCountingIn = usePlayerStore((state) => state.isCountingIn);
  const countIn = usePlayerStore((state) => state.countIn);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const bpm = usePlayerStore((state) => state.bpm);

  const handleClick = () => {
    onCloseEdit();
    togglePlay();
  };

  return (
    <S.PlayButton $isPlaying={isPlaying} onClick={handleClick} $bpm={bpm}>
      {isCountingIn ? (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>{countIn}</span>
      ) : isPlaying ? (
        <Square size={14} fill="currentColor" />
      ) : (
        <Play size={14} fill="currentColor" />
      )}
    </S.PlayButton>
  );
};
