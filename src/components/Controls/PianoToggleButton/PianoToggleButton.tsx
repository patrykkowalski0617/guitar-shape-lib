import { useEffect } from "react";
import { useControlsStore } from "@/store";
import { ControlWrapper } from "../parts";
import { Button } from "@/components/ui/button";
import { Piano } from "lucide-react";
import { CollapsibleSectionTransitionTime } from "@/parts";
import { iconSize } from "@/components/Fretboard/FretboardControls/parts";

export default function PianoToggleButton() {
  const isPianoVisable = useControlsStore((state) => state.isPianoVisable);
  const setIsPianoVisable = useControlsStore((state) => state.setIsPianoVisable);

  useEffect(() => {
    if (isPianoVisable) {
      const timer = setTimeout(() => {
        const target = document.querySelector('[data-piano-scroll-target="true"]');
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, CollapsibleSectionTransitionTime + 100);

      return () => clearTimeout(timer);
    }
  }, [isPianoVisable]);

  const handleToggle = () => {
    setIsPianoVisable(!isPianoVisable);
  };

  return (
    <ControlWrapper>
      <Button variant={isPianoVisable ? "active" : "outline"} onClick={handleToggle}>
        <span className="flex items-center justify-center">
          <Piano size={iconSize} />
        </span>
      </Button>
    </ControlWrapper>
  );
}
