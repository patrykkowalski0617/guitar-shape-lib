import * as S from "./parts";
import { usePlayer } from "./hooks/usePlayer";
import { BpmMultiplierButton } from "./PlayerControls/BpmControls/BpmMultiplierButton";
import { BpmInput } from "./PlayerControls/BpmControls/BpmInput";
import { PlayButton } from "./PlayerControls/PlayButton/PlayButton";
import { UploadPreset } from "./PlayerControls/UploadPreset/UploadPreset";

const BasicControls = () => (
  <S.PlayerNoShadowSection>
    <UploadPreset />
    <BpmMultiplierButton />
    <BpmInput />
    <PlayButton />
  </S.PlayerNoShadowSection>
);

const PlayerRoot = ({ children }: { children: React.ReactNode }) => {
  usePlayer();

  return <S.PlayerContainer>{children}</S.PlayerContainer>;
};

export const Player = Object.assign(PlayerRoot, {
  BasicControls,
  Section: S.PlayerSection,
});
