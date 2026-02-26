import { useMusicStore } from "@/store";
import { Lock, LockOpen } from "lucide-react";
import { ControlWrapper } from "../parts";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function LockShapeButton() {
  const setShapeVariantLocationData_ghost = useMusicStore((state) => state.setShapeVariantLocationData_ghost);
  const shapeVariantLocationData = useMusicStore((state) => state.shapeVariantLocationData);
  const shapeVariantLocationData_ghost = useMusicStore((state) => state.shapeVariantLocationData_ghost);

  const isLocked = shapeVariantLocationData_ghost !== null;
  const isDisabled = shapeVariantLocationData === null && !isLocked;

  const handleToggle = () => {
    if (isDisabled) {
      toast("Select Arpeggio/Scale and its Variant on fretboard first.");
      return;
    }

    if (isLocked) {
      setShapeVariantLocationData_ghost(null);
    } else {
      setShapeVariantLocationData_ghost(shapeVariantLocationData);
    }
  };

  return (
    <ControlWrapper>
      <Button
        variant={isLocked ? "active" : "outline"}
        className={isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        onClick={handleToggle}
      >
        <span className="flex items-center justify-center gap-2">
          {isLocked ? <Lock className="h-3.5 w-3.5 fill-current" /> : <LockOpen className="h-3.5 w-3.5 opacity-50" />}
        </span>
      </Button>
    </ControlWrapper>
  );
}
