import { Button } from "../../../ui/parts";
import { useMetronomeButton } from "./useMetronomeButton";

export const MetronomeButton = () => {
  const { handleMetronomeToggle } = useMetronomeButton();
  return <Button onClick={handleMetronomeToggle}>Toggle metronome</Button>;
};
