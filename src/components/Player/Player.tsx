import * as S from "./parts";
import { usePlayer } from "./hooks/usePlayer";
import { PlayerBricksContainer } from "./PlayerBricksContainer/PlayerBricksContainer";
import { CleanButton } from "./PlayerControls/CleanButton/CleanButton";
import { BpmMultiplierButton } from "./PlayerControls/BpmControls/BpmMultiplierButton";
import { BpmInput } from "./PlayerControls/BpmControls/BpmInput";
import { PlayButton } from "./PlayerControls/PlayButton/PlayButton";
import { UploadPreset } from "./PlayerControls/UploadPreset/UploadPreset";
import { SavePreset } from "./PlayerControls/SavePreset/SavePreset";

const Bricks = () => (
  <S.PlayerSection>
    <PlayerBricksContainer />
  </S.PlayerSection>
);

const BasicControls = () => (
  <S.PlayerNoShadowSection>
    <UploadPreset />
    <BpmMultiplierButton />
    <BpmInput />
    <PlayButton />
  </S.PlayerNoShadowSection>
);

const Controls = () => (
  <S.PlayerSection>
    <CleanButton />
    <SavePreset />
    <UploadPreset />
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
