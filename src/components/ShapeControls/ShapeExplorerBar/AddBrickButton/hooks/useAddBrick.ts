import { usePlayerStore, useMusicStore, useControlsStore } from "@/store";
import { useShapeRootNote } from "@/hooks";
import { SHAPES, type Shapes } from "@/data";

export function useAddBrick() {
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );

  const activeRootNote = useShapeRootNote();

  const addBrick = () => {
    const { addBrick: addBrickToStore } = usePlayerStore.getState();
    const {
      tuneKeyId,
      isMajorMode,
      roleId,
      shapeId,
      shapeSemitoneOffsetFromC,
    } = useControlsStore.getState();
    const { shapeVariantLocationData } = useMusicStore.getState();

    const activeShape = SHAPES[shapeId as keyof Shapes] || null;

    const initialSnapshot = {
      keyId: tuneKeyId,
      isMajorMode,
      roleId,
      shapeVariantLocationData,
      rootNote: activeRootNote,
      shapeLabel: activeShape?.label,
      shapeSemitoneOffsetFromC,
      shapeId,
    };

    addBrickToStore(initialSnapshot);

    setShapeVariantLocationData_locked(shapeVariantLocationData);
  };

  return { addBrick };
}
