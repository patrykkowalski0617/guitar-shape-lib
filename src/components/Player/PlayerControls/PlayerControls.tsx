import { PresetsList } from "@/components/Presets/PresetsList/PresetsList";
import { BpmInput } from "./BpmInput";
import { PlayButton } from "./PlayButton";
import { CleanButton } from "./CleanButton";

export const PlayerControls = ({ onCloseEdit }: { onCloseEdit: () => void }) => {
  return (
    <>
      <CleanButton />
      <PresetsList />
      <BpmInput />
      <PlayButton onCloseEdit={onCloseEdit} />
    </>
  );
};
