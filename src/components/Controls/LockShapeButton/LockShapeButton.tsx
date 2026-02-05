import { useMusicStore } from "@/store/useMusicStore";
import { Lock, LockOpen } from "lucide-react";
import { useControlsStore } from "@/store/useControlsStore";
import { ControlWrapper } from "@/parts";
import TutorialPopover from "@/components/TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "@/components/TutorialPopover/tutorial.config";
import { Button } from "@/components/ui/button";

export function LockShapeButton() {
  const setLockedShapeVariantLocationData = useMusicStore(
    (state) => state.setLockedShapeVariantLocationData,
  );
  const currentShapeVariantLocationData = useMusicStore(
    (state) => state.currentShapeVariantLocationData,
  );
  const lockedShapeVariantLocationData = useMusicStore(
    (state) => state.lockedShapeVariantLocationData,
  );
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setLockedRoleId = useMusicStore((state) => state.setLockedRoleId);

  const isLocked = lockedShapeVariantLocationData !== null;

  const handleToggle = () => {
    if (isLocked) {
      setLockedShapeVariantLocationData(null);
      setLockedRoleId(null);
    } else {
      setLockedShapeVariantLocationData(currentShapeVariantLocationData);
      setLockedRoleId(currentRoleId);
    }
  };

  const txtIsTrue = "Shape Locked";
  const txtIsFalse = "Lock Shape";

  const labelPlaceholder = (
    <span className="flex items-center gap-2">
      <Lock className="h-3.5 w-3.5" />
      <span>{txtIsTrue}</span>
    </span>
  );

  const isDisabled = currentShapeVariantLocationData === null && !isLocked;

  return (
    <ControlWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.LOCK_SHAPE} />
      <Button
        variant={isLocked ? "active" : "outline"}
        onClick={handleToggle}
        disabled={isDisabled}
        fixedWidthLabel={labelPlaceholder}
      >
        <span className="flex items-center justify-center gap-2">
          {isLocked ? (
            <Lock className="h-3.5 w-3.5 fill-current" />
          ) : (
            <LockOpen className="h-3.5 w-3.5 opacity-50" />
          )}
          <span>{isLocked ? txtIsTrue : txtIsFalse}</span>
        </span>
      </Button>
    </ControlWrapper>
  );
}
