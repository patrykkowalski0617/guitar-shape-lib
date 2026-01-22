import { useEffect } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { generateScaleSteps, getStepsCountForFunction } from "@/utils";

export const useMusicEngine = () => {
  const currentRoleId = useControlsStore((s) => s.currentRoleId);
  const currentKeyId = useControlsStore((s) => s.currentKeyId);
  const currentShapeSemitoneOffsetFromC = useControlsStore(
    (s) => s.currentShapeSemitoneOffsetFromC,
  );
  const isMajorMode = useControlsStore((s) => s.isMajorMode);
  const currentShapeId = useControlsStore((s) => s.currentShapeId);

  const setActiveScaleSteps = useMusicStore((s) => s.setActiveScaleSteps);
  const setActiveShapePoint = useMusicStore((s) => s.setActiveShapePoint);

  useEffect(() => {
    const count = getStepsCountForFunction(currentRoleId);
    setActiveScaleSteps(generateScaleSteps(count));

    setActiveShapePoint(null);
  }, [
    currentRoleId,
    currentKeyId,
    isMajorMode,
    currentShapeId,
    currentShapeSemitoneOffsetFromC,
    setActiveScaleSteps,
    setActiveShapePoint,
  ]);
};
