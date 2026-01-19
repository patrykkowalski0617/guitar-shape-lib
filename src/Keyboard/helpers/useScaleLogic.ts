import { useControlsStore } from "@/store/useControlsStore";

export const useScaleLogic = () => {
  const { isMajorMode, currentKeyId, shiftKey, currentRoleId, currentShapeId, currentShapeOffset } =
    useControlsStore();

  console.log({
    isMajorMode,
    currentKeyId,
    shiftKey,
    currentRoleId,
    currentShapeId,
    currentShapeOffset,
  });
};
