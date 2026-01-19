import { useControlsStore } from "@/store/useControlsStore";

export type HighlightRole = "tonic" | "subdominant" | "dominant" | "none";

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
