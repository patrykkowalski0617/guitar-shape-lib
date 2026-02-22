import { Play, Square } from "lucide-react";
import * as S from "./parts";

interface Props {
  isPlaying: boolean;
  bpm: number;
  onTogglePlay: () => void;
  onBpmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PlayerControls = ({ isPlaying, bpm, onTogglePlay, onBpmChange }: Props) => (
  <S.ControlsRow>
    <S.PlayButton $isPlaying={isPlaying} onClick={onTogglePlay} $bpm={bpm}>
      {isPlaying ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
    </S.PlayButton>
    <S.BpmInput type="number" value={bpm} onChange={onBpmChange} min={20} max={360} />
  </S.ControlsRow>
);
