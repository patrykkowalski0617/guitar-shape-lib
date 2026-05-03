import * as S from "./parts";
import { usePlayer } from "./hooks/usePlayer";
import { PlayerBricksContainer } from "./PlayerBricksContainer/PlayerBricksContainer";
import { PlayerControls } from "./PlayerControls/PlayerControls";
import { usePersistentUnlock } from "@/hooks";
import { usePlayerStore } from "@/store";

export default function Player() {
  usePlayer();
  const bricks = usePlayerStore((state) => state.bricks);

  const isTemporarlyDisabled = usePersistentUnlock(!bricks.length);

  return (
    <S.PlayerContainer>
      <S.PlayerSection $isTemporarlyDisabled={isTemporarlyDisabled}>
        <PlayerBricksContainer />
      </S.PlayerSection>

      <S.PlayerSection>
        <PlayerControls />
      </S.PlayerSection>
    </S.PlayerContainer>
  );
}
