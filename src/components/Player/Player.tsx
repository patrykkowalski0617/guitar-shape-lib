import { usePlayer } from "./hooks/usePlayer";

import * as S from "./parts";
import { PlayerBricksContainer } from "./PlayerBricksContainer/PlayerBricksContainer";
import { PlayerControls } from "./PlayerControls/PlayerControls";

export default function Player() {
  usePlayer();

  return (
    <S.PlayerContainer>
      <S.PlayerSection>
        <PlayerBricksContainer />
      </S.PlayerSection>
      <S.PlayerSection>
        <PlayerControls />
      </S.PlayerSection>
    </S.PlayerContainer>
  );
}
