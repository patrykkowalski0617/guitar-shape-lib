import { usePlayerStore, useMusicStore, useControlsStore } from "@/store";
import { SHAPES, type Shapes } from "@/data";

export function useAddBrick() {
  const setShapeVariantDataKeys_locked = useMusicStore(
    (state) => state.setShapeVariantDataKeys_locked,
  );

  const shapeDataKey = useControlsStore((state) => state.shapeDataKey);
  if (!shapeDataKey) return {};

  const addBrick = () => {
    const { addBrick: addBrickToStore } = usePlayerStore.getState();
    const {
      unifiedMusicKeysDataKey,
      baseChordDataKey,
      shapeDataKey,
      semitoneOffsetFromMajorTonicRoot,
    } = useControlsStore.getState();
    const { shapeVariantDataKeys } = useMusicStore.getState();

    const activeShape = SHAPES[shapeDataKey as keyof Shapes] || null;

    const initialSnapshot = {
      unifiedMusicKeysDataKey: unifiedMusicKeysDataKey,
      baseChordDataKey,
      shapeVariantDataKeys,
      shapeLabel: activeShape?.label,
      semitoneOffsetFromMajorTonicRoot,
      shapeDataKey,
    };

    addBrickToStore(initialSnapshot);
    // @ts-expect-error: Unreachable code error

    setShapeVariantDataKeys_locked(shapeVariantDataKeys);
  };

  return { addBrick };
}
