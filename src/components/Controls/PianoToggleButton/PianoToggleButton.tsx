import { useControlsStore } from "@/store/useControlsStore";
import { ControlWrapper } from "@/parts";
import { Button } from "@/components/ui/button";
import { Piano } from "lucide-react";

export default function PianoToggleButton() {
  const showPiano = useControlsStore((state) => state.showPiano);
  const setShowPiano = useControlsStore((state) => state.setShowPiano);

  const handleToggle = () => {
    setShowPiano(!showPiano);
  };

  return (
    <ControlWrapper>
      <Button variant={showPiano ? "active" : "outline"} onClick={handleToggle}>
        <span className="flex items-center justify-center">
          <Piano className={`h-4 w-4 ${showPiano ? "opacity-100" : "opacity-50"}`} />
        </span>
      </Button>
    </ControlWrapper>
  );
}
