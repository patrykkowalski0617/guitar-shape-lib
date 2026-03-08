import { PresetsList } from "@/components/PlayerPresets/PresetsList/PresetsList";
import { BpmInput } from "./BpmControls/BpmInput";
import { PlayButton } from "./PlayButton/PlayButton";
import { CleanButton } from "./CleanButton/CleanButton";
import { BpmMultiplierButton } from "./BpmControls/BpmMultiplierButton";

export const PlayerControls = () => {
  return (
    <>
      <CleanButton />
      <PresetsList />
      <BpmMultiplierButton />
      <BpmInput />
      <PlayButton />
    </>
  );
};
