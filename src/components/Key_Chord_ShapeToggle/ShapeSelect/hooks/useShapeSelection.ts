import { useControlsStore, useMusicStore } from "@/store";

export function useShapeSelection() {
  const shapeId = useControlsStore((state) => state.shapeId);
  const shapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.shapeSemitoneOffsetFromC,
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
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);

  const setShape = useControlsStore((state) => state.setShape);
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );

  const isShapeActive = shapeId !== null && shapeSemitoneOffsetFromC !== null;
  const activeShapeValue = `${shapeId}|${shapeSemitoneOffsetFromC}`;

  const currentShapeValue = isShapeActive ? activeShapeValue : undefined;

  const handleValueChange = (value: string) => {
    setShapeVariantLocationData(null);

    const [id, offsetStr] = value.split("|");
    const offset = parseInt(offsetStr, 10);

    setShape(id, offset);

    resetActiveLockedNoteIds();
    setBaseChordId(baseChordId);
  };

  return {
    currentShapeValue,
    handleValueChange,
    isShapeSelectOpen,
    setIsShapeSelectOpen,
  };
}
