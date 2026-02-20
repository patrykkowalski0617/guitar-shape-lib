import { useMusicStore } from "@/store/useMusicStore";

export const useShapeUniqueId = () => {
  const currentLocation = useMusicStore((state) => state.currentShapeVariantLocationData);

  return currentLocation ? `${currentLocation.shapeId}-${currentLocation.stringId}-${currentLocation.variantId}` : null;
};
