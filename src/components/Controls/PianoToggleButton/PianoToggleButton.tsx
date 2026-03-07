import { useControlsStore } from "@/store";
import { ControlWrapper, iconSize } from "../parts";
import { Button } from "@/components/ui/button";
import { Piano } from "lucide-react";

export default function PianoToggleButton() {
  const isPianoVisible = useControlsStore((state) => state.isPianoVisible);
  const setIsPianoVisible = useControlsStore(
    (state) => state.setIsPianoVisible,
  );

  const handleToggle = () => {
    const nextState = !isPianoVisible;
    setIsPianoVisible(nextState, nextState);
  };

  return (
    <ControlWrapper>
      <Button
        variant={isPianoVisible ? "active" : "outline"}
        onClick={handleToggle}
      >
        <span className="flex items-center justify-center">
          <Piano size={iconSize} />
        </span>
      </Button>
    </ControlWrapper>
  );
}
