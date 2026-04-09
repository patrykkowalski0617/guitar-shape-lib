import { Button } from "@/components/ui/button";
import { useControlsStore, useMusicStore } from "@/store";
import { BrushCleaning } from "lucide-react";
import * as P from "./parts";

export const CleanButton = () => {
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);
  const resetActiveLockedNotes = useMusicStore(
    (state) => state.resetActiveLockedNotes,
  );
  const shapeId = useControlsStore((state) => state.shapeId);
  const setShape = useControlsStore((state) => state.setShape);

  const baseChordId = useControlsStore((state) => state.baseChordId);
  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);

  const isVisible = !!(
    activeLockedNotes.length ||
    shapeVariantLocationData ||
    shapeId ||
    baseChordId
  );

  const handleClick = () => {
    setShapeVariantLocationData(null);
    resetActiveLockedNotes();
    setShape(null, null);
    setBaseChordId(null);
  };

  return (
    <P.Wrapper $isVisible={isVisible}>
      <Button
        className="min-w-[70px] rounded-sm bg-background h-8"
        onClick={handleClick}
      >
        <BrushCleaning size={18} color="var(--primary)" />
      </Button>
    </P.Wrapper>
  );
};
