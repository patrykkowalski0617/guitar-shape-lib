import { Play, Square } from "lucide-react";
import * as S from "./parts";
import { usePlayerStore } from "@/store/usePlayerStore";

export const PlayButton = ({ onCloseEdit }: { onCloseEdit: () => void }) => {
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const isCountingIn = usePlayerStore((s) => s.isCountingIn);
  const countIn = usePlayerStore((s) => s.countIn);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const bpm = usePlayerStore((s) => s.bpm);

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
