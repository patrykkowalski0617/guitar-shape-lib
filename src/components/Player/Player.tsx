import * as S from "./parts";
import { usePlayer } from "./hooks/usePlayer";
import { PlayerBricksContainer } from "./PlayerBricksContainer/PlayerBricksContainer";
import { CleanButton } from "./PlayerControls/CleanButton/CleanButton";
import { PlayerPresets } from "./PlayerPresets/PlayerPresets";
import { BpmMultiplierButton } from "./PlayerControls/BpmControls/BpmMultiplierButton";
import { BpmInput } from "./PlayerControls/BpmControls/BpmInput";
import { PlayButton } from "./PlayerControls/PlayButton/PlayButton";

const Bricks = () => (
  <S.PlayerSection>
    <PlayerBricksContainer />
  </S.PlayerSection>
);

const BasicControls = () => (
  <S.PlayerNoShadowSection>
    <PlayerPresets />
    <BpmMultiplierButton />
    <BpmInput />
    <PlayButton />
  </S.PlayerNoShadowSection>
);

const Controls = () => (
  <S.PlayerSection>
    <CleanButton />
    <PlayerPresets />
    <BpmMultiplierButton />
    <BpmInput />
    <PlayButton />
  </S.PlayerSection>
);

const PlayerRoot = ({ children }: { children: React.ReactNode }) => {
  usePlayer();

  return <S.PlayerContainer>{children}</S.PlayerContainer>;
};

export const Player = Object.assign(PlayerRoot, {
  Bricks,
  BasicControls,
  Controls,
  Section: S.PlayerSection,
});
