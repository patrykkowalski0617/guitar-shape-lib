import { usePlayerStore, useMusicStore, useControlsStore } from "@/store";
import { useCurrentShapeRootNote } from "@/hooks";
import { SHAPES, type Shapes } from "@/data";

export function useAddBrick() {
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const activeRootNote = useCurrentShapeRootNote();

  const shapeId = useControlsStore((state) => state.shapeId);
  if (!shapeId) return {};

  const addBrick = () => {
    const { addBrick: addBrickToStore } = usePlayerStore.getState();
    const {
      tuneKeyId,
      baseChordId,
      shapeId,
      semitoneOffsetFromMajorTonicRoot,
    } = useControlsStore.getState();
    const { shapeVariantLocationData } = useMusicStore.getState();

    const activeShape = SHAPES[shapeId as keyof Shapes] || null;

    const initialSnapshot = {
      tuneKeyId: tuneKeyId,
      baseChordId,
      shapeVariantLocationData,
      rootNote: activeRootNote,
      shapeLabel: activeShape?.label,
      semitoneOffsetFromMajorTonicRoot,
      shapeId,
    };

    addBrickToStore(initialSnapshot);

    setShapeVariantLocationData_locked(shapeVariantLocationData);
  };

  return { addBrick };
}
