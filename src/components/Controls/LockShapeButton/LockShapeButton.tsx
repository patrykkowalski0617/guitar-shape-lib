import { useMusicStore } from "@/store/useMusicStore";
import { Lock, LockOpen } from "lucide-react";
import { ControlWrapper } from "@/parts";
import { Button } from "@/components/ui/button";

export function LockShapeButton() {
  const setLockedShapeVariantLocationData = useMusicStore((state) => state.setLockedShapeVariantLocationData);
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);
  const lockedShapeVariantLocationData = useMusicStore((state) => state.lockedShapeVariantLocationData);

  const isLocked = lockedShapeVariantLocationData !== null;

  const handleToggle = () => {
    if (isLocked) {
      setLockedShapeVariantLocationData(null);
    } else {
      setLockedShapeVariantLocationData(currentShapeVariantLocationData);
    }
  };

  const isDisabled = currentShapeVariantLocationData === null && !isLocked;

  return (
    <ControlWrapper>
      <Button variant={isLocked ? "active" : "outline"} onClick={handleToggle} disabled={isDisabled}>
        <span className="flex items-center justify-center gap-2">
          {isLocked ? <Lock className="h-3.5 w-3.5 fill-current" /> : <LockOpen className="h-3.5 w-3.5 opacity-50" />}
        </span>
      </Button>
    </ControlWrapper>
  );
}
