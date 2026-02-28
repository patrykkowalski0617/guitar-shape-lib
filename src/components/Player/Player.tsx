import { usePlayer } from "./hooks/usePlayer";

import * as S from "./parts";
import { PlayerBricksContainer } from "./PlayerBricksContainer/PlayerBricksContainer";
import { PlayerControls } from "./PlayerControls/PlayerControls";

export default function Player() {
  const { closeEdit } = usePlayer();

  return (
    <S.PlayerContainer>
      <S.PlayerSection>
        <PlayerBricksContainer onCloseEdit={closeEdit} />
      </S.PlayerSection>
      <S.PlayerSection>
        <PlayerControls onCloseEdit={closeEdit} />
      </S.PlayerSection>
    </S.PlayerContainer>
  );
}
