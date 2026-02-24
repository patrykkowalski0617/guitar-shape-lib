import { BpmInput } from "./BpmInput";
import { PlayButton } from "./PlayButton";

export const PlayerControls = ({ onCloseEdit }: { onCloseEdit: () => void }) => {
  return (
    <>
      <PlayButton onCloseEdit={onCloseEdit} />
      <BpmInput />
    </>
  );
};
