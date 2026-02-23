import { useEffect } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { ControlWrapper } from "../parts";
import { Button } from "@/components/ui/button";
import { Piano } from "lucide-react";

export default function PianoToggleButton() {
  const showPiano = useControlsStore((state) => state.showPiano);
  const setShowPiano = useControlsStore((state) => state.setShowPiano);

  useEffect(() => {
    if (showPiano) {
      const timer = setTimeout(() => {
        const target = document.querySelector('[data-piano-scroll-target="true"]');
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [showPiano]);

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
