import { useControlsStore, useMusicStore } from "@/store";

export function useShapeSelection() {
  const shapeDataKey = useControlsStore((state) => state.shapeDataKey);
  const semitoneOffsetFromMajorRoot = useControlsStore(
    (state) => state.semitoneOffsetFromMajorRoot,
  );
  const resetActiveLockedNoteIds = useMusicStore(
    (state) => state.resetActiveLockedNoteIds,
  );
  const isShapeSelectOpen = useControlsStore(
    (state) => state.isShapeSelectOpen,
  );
  const setIsShapeSelectOpen = useControlsStore(
    (state) => state.setIsShapeSelectOpen,
  );
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const setBaseChordDataKey = useControlsStore(
    (state) => state.setBaseChordDataKey,
  );

  const setShape = useControlsStore((state) => state.setShape);
  const setShapeVariantDataKeys = useMusicStore(
    (state) => state.setShapeVariantDataKeys,
  );

  const isShapeActive =
    shapeDataKey !== null && semitoneOffsetFromMajorRoot !== null;
  const activeShapeValue = `${shapeDataKey}|${semitoneOffsetFromMajorRoot}`;

  const currentShapeValue = isShapeActive ? activeShapeValue : undefined;

  const handleValueChange = (value: string) => {
    setShapeVariantDataKeys(null);

    const [id, offsetStr] = value.split("|");
    const offset = parseInt(offsetStr, 10);

    setShape(id, offset);

    resetActiveLockedNoteIds();
    setBaseChordDataKey(baseChordDataKey);
  };

  return {
    currentShapeValue,
    handleValueChange,
    isShapeSelectOpen,
    setIsShapeSelectOpen,
  };
}
