import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";

export const useCurrentShapeVariantProgressId = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeVariantLocationData = useMusicStore(
    (state) => state.currentShapeVariantLocationData,
  );
  if (!currentShapeId || !currentShapeVariantLocationData) return null;

  const { stringKey, variantId } = currentShapeVariantLocationData;

  return `${currentShapeId}-${stringKey}-${variantId}`;
};
