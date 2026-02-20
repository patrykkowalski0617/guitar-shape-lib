import { useMusicStore } from "@/store/useMusicStore";
import { Lock, LockOpen } from "lucide-react";
import { ControlWrapper } from "@/parts";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function LockShapeButton() {
  const setLockedShapeVariantLocationData = useMusicStore((state) => state.setLockedShapeVariantLocationData);
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);
  const lockedShapeVariantLocationData = useMusicStore((state) => state.lockedShapeVariantLocationData);

  const isLocked = lockedShapeVariantLocationData !== null;
  const isDisabled = currentShapeVariantLocationData === null && !isLocked;

  const handleToggle = () => {
    if (isDisabled) {
      toast("Select Arpeggio/Scale and its Variant on fretboard first.");
      return;
    }

    if (isLocked) {
      setLockedShapeVariantLocationData(null);
    } else {
      setLockedShapeVariantLocationData(currentShapeVariantLocationData);
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
