import { useControlsStore, useMusicStore, usePlayerStore } from "@/store";
import { BrushCleaning } from "lucide-react";
import * as P from "./parts";
import type { StringIndex } from "../Fretboard/constants";

export const CleanButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const shapeVariantDataKeys = useMusicStore(
    (state) => state.shapeVariantDataKeys,
  );
  const setShapeVariantDataKeys = useMusicStore(
    (state) => state.setShapeVariantDataKeys,
  );
  const activeLockedNoteIds = useMusicStore(
    (state) => state.activeLockedNoteIds,
  );
  const resetActiveLockedNoteIds = useMusicStore(
    (state) => state.resetActiveLockedNoteIds,
  );
  const shapeDataKey = useControlsStore((state) => state.shapeDataKey);
  const setShape = useControlsStore((state) => state.setShape);
  const setBaseChordDataKey = useControlsStore(
    (state) => state.setBaseChordDataKey,
  );
  const setVisibleStrings = useControlsStore(
    (state) => state.setVisibleStrings,
  );
  const visibleStrings = useControlsStore((state) => state.visibleStrings);
  const defaultVisibleStrings = [0, 1, 2, 3, 4, 5] as StringIndex[];

  const isDisabled =
    isPlaying ||
    !(
      activeLockedNoteIds.length ||
      shapeVariantDataKeys ||
      shapeDataKey ||
      visibleStrings.toString() !== defaultVisibleStrings.toString()
    );

  const handleClick = () => {
    setShapeVariantDataKeys(null);
    resetActiveLockedNoteIds();
    setShape(null, null);
    setBaseChordDataKey(null);
    setBaseChordDataKey(null);
    setVisibleStrings(defaultVisibleStrings);
  };

  return (
    <P.Wrapper onClick={handleClick} $isDisabled={isDisabled}>
      <BrushCleaning size={22} />
    </P.Wrapper>
  );
};
