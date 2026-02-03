import { useEffect } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";

export const useShapeReset = () => {
  const currentRoleId = useControlsStore((s) => s.currentRoleId);
  const currentKeyId = useControlsStore((s) => s.currentKeyId);
  const currentShapeSemitoneOffsetFromC = useControlsStore(
    (s) => s.currentShapeSemitoneOffsetFromC,
  );
  const isMajorMode = useControlsStore((s) => s.isMajorMode);
  const currentShapeId = useControlsStore((s) => s.currentShapeId);

  const setCurrentShapeVariantLocationData = useMusicStore(
    (s) => s.setCurrentShapeVariantLocationData,
  );

  useEffect(() => {
    setCurrentShapeVariantLocationData(null);
  }, [
    isMajorMode,
    currentKeyId,
    currentRoleId,
    currentShapeId,
    currentShapeSemitoneOffsetFromC,
    setCurrentShapeVariantLocationData,
  ]);
};
