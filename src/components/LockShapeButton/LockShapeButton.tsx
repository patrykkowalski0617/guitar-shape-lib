import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import shapes, { type Shapes } from "@/utils/shapes";
import { GroupWrapper, Label } from "../customUI/InputGroup/InputGroup";
import { Button } from "../ui/button";
import { Lock, LockOpen } from "lucide-react";

export const LockShapeButton = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const { lockedShape, setLockedShape, activeShapePoint } = useMusicStore();

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
        }
      }
    }
  };

  return (
    <GroupWrapper>
      <Label>{"Lock Shape"}</Label>

      <div className="flex items-center">
        <Button
          variant="outline"
          onClick={handleToggle}
          disabled={!currentShapeId && !isLocked}
          className={`
            h-10 px-4 transition-all duration-200
            border-muted-foreground/20 
            w-34            ${
              isLocked
                ? "bg-muted/50 border-secondary/50 outline outline-2 outline-[var(--secondary)] outline-offset-2"
                : "bg-muted/30 text-foreground hover:bg-muted/50"
            }
          `}
        >
          <div className="flex items-center gap-2">
            {isLocked ? (
              <Lock className="h-3.5 w-3.5 fill-current" />
            ) : (
              <LockOpen className="h-3.5 w-3.5 opacity-50" />
            )}
            <span>{isLocked ? "Shape Locked" : "Lock Current"}</span>
          </div>
        </Button>
      </div>
    </GroupWrapper>
  );
};
