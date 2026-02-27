import { useMusicStore } from "@/store";
import { Lock, LockOpen } from "lucide-react";
import { ControlWrapper, iconSize } from "../parts";
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
        className={isDisabled ? "opacity-50" : ""}
        onClick={handleToggle}
      >
        {isLocked ? (
          <Lock size={iconSize} className="fill-current" />
        ) : (
          <LockOpen size={iconSize} className="opacity-50" />
        )}
      </Button>
    </ControlWrapper>
  );
}
