import { PlayerPresets } from "@/components/PlayerPresets/PlayerPresets";
import { BpmInput } from "./BpmControls/BpmInput";
import { PlayButton } from "./PlayButton/PlayButton";
import { CleanButton } from "./CleanButton/CleanButton";
import { BpmMultiplierButton } from "./BpmControls/BpmMultiplierButton";

export const PlayerControls = () => {
  return (
    <>
      <CleanButton />
      <PlayerPresets />
      <BpmMultiplierButton />
      <BpmInput />
      <PlayButton />
    </>
  );
};
