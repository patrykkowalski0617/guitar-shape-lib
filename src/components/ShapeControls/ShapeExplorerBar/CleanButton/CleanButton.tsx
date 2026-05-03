import { useControlsStore, useMusicStore } from "@/store";
import { BrushCleaning } from "lucide-react";
import * as P from "./parts";
import { usePersistentUnlock } from "@/hooks";

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

  const isDisabled = !(
    activeLockedNotes.length ||
    shapeVariantLocationData ||
    shapeId
  );

  const isTemporarlyDisabled = usePersistentUnlock(isDisabled);

  const handleClick = () => {
    setShapeVariantLocationData(null);
    resetActiveLockedNotes();
    setShape(null, null);
    setBaseChordId(null);
    setToggleBaseChordId(null);
  };

  return (
    <P.Wrapper
      onClick={handleClick}
      $isDisabled={isDisabled}
      $isTemporarlyDisabled={isTemporarlyDisabled}
    >
      <BrushCleaning size={20} color="var(--warn)" />
    </P.Wrapper>
  );
};
