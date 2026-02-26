import { PresetsList } from "@/components/Presets/PresetsList/PresetsList";
import { BpmInput } from "./BpmInput";
import { PlayButton } from "./PlayButton";
import { CleanButton } from "./CleanButton";
import { BpmButton } from "./BpmButton";

export const PlayerControls = ({ onCloseEdit }: { onCloseEdit: () => void }) => {
  return (
    <>
      <CleanButton />
      <PresetsList />
      <BpmButton />
      <BpmInput />
      <PlayButton onCloseEdit={onCloseEdit} />
    </>
  );
};
