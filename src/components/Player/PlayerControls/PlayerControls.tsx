import { PresetsList } from "@/components/PlayerPresets/PresetsList/PresetsList";
import { BpmInput } from "./BpmInput/BpmInput";
import { PlayButton } from "./PlayButton";
import { CleanButton } from "./CleanButton";
import { BpmButton } from "./BpmButton";

export const PlayerControls = () => {
  return (
    <>
      <CleanButton />
      <PresetsList />
      <BpmButton />
      <BpmInput />
      <PlayButton />
    </>
  );
};
