import * as S from "./parts";
import { usePlayer } from "./hooks/usePlayer";
import { PlayerBricksContainer } from "./PlayerBricksContainer/PlayerBricksContainer";
import { PlayerControls } from "./PlayerControls/PlayerControls";
import { ShapeSelect } from "./ShapeControls/ShapeSelect/ShapeSelect";
import { KeySelect } from "./ShapeControls/KeySelect/KeySelect";
import { usePlayerStore } from "@/store";

export default function Player() {
  usePlayer();
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  return (
    <S.PlayerContainer>
      <S.PlayerSection>
        <PlayerBricksContainer />
      </S.PlayerSection>
      {!isPlaying && (
        <S.PlayerSection>
          <KeySelect />
          <ShapeSelect />
        </S.PlayerSection>
      )}
      <S.PlayerSection>
        <PlayerControls />
      </S.PlayerSection>
    </S.PlayerContainer>
  );
}
