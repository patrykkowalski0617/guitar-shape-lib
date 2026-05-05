import * as S from "./parts";
import { usePlayer } from "./hooks/usePlayer";
import { PlayerBricksContainer } from "./PlayerBricksContainer/PlayerBricksContainer";
import { PlayerControls } from "./PlayerControls/PlayerControls";

const Bricks = () => (
  <S.PlayerSection>
    <PlayerBricksContainer />
  </S.PlayerSection>
);

const ControlsWithoutConatiner = () => <PlayerControls />;

const Controls = () => (
  <S.PlayerSection>
    <PlayerControls />
  </S.PlayerSection>
);

const PlayerRoot = ({ children }: { children: React.ReactNode }) => {
  usePlayer();

  return <S.PlayerContainer>{children}</S.PlayerContainer>;
};

export const Player = Object.assign(PlayerRoot, {
  Bricks,
  ControlsWithoutConatiner,
  Controls,
  Section: S.PlayerSection,
});
