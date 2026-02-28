import { usePlayerStore, useMusicStore, useControlsStore } from "@/store";
import { useShapeRootNote } from "@/hooks";
import { shapes, type Shapes } from "@/data";

export function useAddBrick() {
  const shapeVariantLocationData = useMusicStore((state) => state.shapeVariantLocationData);
  const setShapeVariantLocationData_ghost = useMusicStore((state) => state.setShapeVariantLocationData_ghost);

  const tuneKeyId = useControlsStore((s) => s.tuneKeyId);
  const isMajorMode = useControlsStore((s) => s.isMajorMode);
  const roleId = useControlsStore((s) => s.roleId);
  const shapeId = useControlsStore((s) => s.shapeId);
  const shapeSemitoneOffsetFromC = useControlsStore((s) => s.shapeSemitoneOffsetFromC);
  const activeRootNote = useShapeRootNote();

  const addBrick = () => {
    const activeShape = shapes[shapeId as keyof Shapes] || null;

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

    const playerStore = usePlayerStore.getState();
    playerStore.addBrick(initialSnapshot);

    setShapeVariantLocationData_ghost(shapeVariantLocationData);
  };

  return { addBrick };
}
