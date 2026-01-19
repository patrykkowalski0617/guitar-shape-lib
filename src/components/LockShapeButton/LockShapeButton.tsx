import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import shapes, { type Shapes } from "@/utils/shapes";
import { GroupWrapper } from "../customUI/InputGroup/InputGroup";
import { Button } from "../ui/button";
import { Lock, LockOpen } from "lucide-react";
import { useTutorialHover } from "../TutorialBox/helpers/useTutorialHover";

export const LockShapeButton = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setLockedRoleId = useMusicStore((state) => state.setLockedRoleId);
  const lockedShape = useMusicStore((state) => state.lockedShape);
  const setLockedShape = useMusicStore((state) => state.setLockedShape);
  const activeShapePoint = useMusicStore((state) => state.activeShapePoint);

  const isLocked = lockedShape !== null;

  const handleToggle = () => {
    if (isLocked) {
      setLockedShape(null);
      return;
    }

    if (currentShapeId && activeShapePoint) {
      const shapeCategory = (shapes as Shapes)[currentShapeId];

      if (shapeCategory && shapeCategory.shapesCoordinates) {
        const validVariants = Object.entries(shapeCategory.shapesCoordinates)
          .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
          .map(([, points]) => points as [number, number][])
          .filter((v) => v.length > 0 && v[0][0] === activeShapePoint.stringIdx);

        if (validVariants.length > 0) {
          const selectedVariant = validVariants[activeShapePoint.variantIdx % validVariants.length];
          const rootFretOffset = selectedVariant[0][1];

          const points = selectedVariant.map(([s, fOffset]) => ({
            s,
            f: activeShapePoint.fretIdx + (fOffset - rootFretOffset),
          }));

          setLockedShape(points);
          setLockedRoleId(currentRoleId);
        }
      }
    }
  };
  const tutorialHover_lockShape = useTutorialHover("lock-shape");

  return (
    <div {...tutorialHover_lockShape}>
      <GroupWrapper>
        <Button
          className="min-w-[125px]"
          variant="outline"
          onClick={handleToggle}
          disabled={!activeShapePoint && !isLocked}
        >
          <div className="flex items-center gap-2">
            {isLocked ? (
              <Lock className="h-3.5 w-3.5 fill-current" />
            ) : (
              <LockOpen className="h-3.5 w-3.5 opacity-50" />
            )}
            <span>{isLocked ? "Shape Locked" : "Lock Shape"}</span>
          </div>
        </Button>
      </GroupWrapper>
    </div>
  );
};
