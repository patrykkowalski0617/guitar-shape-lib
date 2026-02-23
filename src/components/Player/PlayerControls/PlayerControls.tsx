import { Play, Square } from "lucide-react";
import * as S from "./parts";
import { usePlayerStore } from "@/store/usePlayerStore";

interface Props {
  onBpmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PlayerControls = ({ onBpmChange }: Props) => {
  const bpm = usePlayerStore((s) => s.bpm);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  return (
    <>
      <S.PlayButton $isPlaying={isPlaying} onClick={togglePlay} $bpm={bpm}>
        {isPlaying ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
      </S.PlayButton>
      <S.BpmInput type="number" value={bpm} onChange={onBpmChange} min={20} max={360} />
    </>
  );
};
