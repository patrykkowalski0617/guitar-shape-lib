import { Play, Square } from "lucide-react";
import * as S from "./parts";
import { usePlayerStore } from "@/store/usePlayerStore";

interface Props {
  onBpmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PlayerControls = ({ onBpmChange }: Props) => {
  const bpm = usePlayerStore((s) => s.bpm);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const isCountingIn = usePlayerStore((s) => s.isCountingIn);
  const countIn = usePlayerStore((s) => s.countIn);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  return (
    <>
      <S.PlayButton $isPlaying={isPlaying} onClick={togglePlay} $bpm={bpm}>
        {isCountingIn ? (
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>{countIn}</span>
        ) : isPlaying ? (
          <Square size={14} fill="currentColor" />
        ) : (
          <Play size={14} fill="currentColor" />
        )}
      </S.PlayButton>
      <S.BpmInput type="number" value={bpm} onChange={onBpmChange} min={20} max={360} />
    </>
  );
};
