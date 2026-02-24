import { useMusicStore, useControlsStore } from "@/store";

export const useCurrentShapeVariantProgressId = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeVariantLocationData = useMusicStore((state) => state.currentShapeVariantLocationData);
  if (!currentShapeId || !currentShapeVariantLocationData) return null;

  const { stringId, variantId } = currentShapeVariantLocationData;

  return `${currentShapeId}-${stringId}-${variantId}`;
};
