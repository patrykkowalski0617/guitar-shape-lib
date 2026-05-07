import { useControlsStore, useMusicStore } from "@/store";
import { BrushCleaning } from "lucide-react";
import * as P from "./parts";
import type { StringIndex } from "../Fretboard/constants";

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
  const setVisibleStrings = useControlsStore(
    (state) => state.setVisibleStrings,
  );
  const visibleStrings = useControlsStore((state) => state.visibleStrings);
  const defaultVisibleStrings = [0, 1, 2, 3, 4, 5] as StringIndex[];

  const isDisabled = !(
    activeLockedNotes.length ||
    shapeVariantLocationData ||
    shapeId ||
    visibleStrings.toString() !== defaultVisibleStrings.toString()
  );

  const handleClick = () => {
    setShapeVariantLocationData(null);
    resetActiveLockedNotes();
    setShape(null, null);
    setBaseChordId(null);
    setBaseChordId(null);
    setVisibleStrings(defaultVisibleStrings);
  };

  return (
    <P.Wrapper onClick={handleClick} $isDisabled={isDisabled}>
      <BrushCleaning size={22} />
    </P.Wrapper>
  );
};
