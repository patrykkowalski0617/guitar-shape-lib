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

  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);
  const setToggleBaseChordId = useControlsStore(
    (state) => state.setToggleBaseChordId,
  );

  const isVisible = !!(
    activeLockedNotes.length ||
    shapeVariantLocationData ||
    shapeId
  );

  const handleClick = () => {
    setShapeVariantLocationData(null);
    resetActiveLockedNotes();
    setShape(null, null);
    setBaseChordId(null);
    setToggleBaseChordId(null);
  };

  if (!isVisible) return null;

  return (
    <P.Wrapper>
      <Button className="min-w-[70px] rounded-sm  h-8" onClick={handleClick}>
        <BrushCleaning size={22} color="var(--warn)" />
      </Button>
    </P.Wrapper>
  );
};
