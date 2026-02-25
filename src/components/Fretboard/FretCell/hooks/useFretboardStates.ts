import { useControlsStore } from "@/store";
import { isGlobalRole } from "@/data";

export const useFretboardStates = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);

  return {
    isShapeSelected: currentShapeId !== null,
    isRoleSelected: !isGlobalRole(currentRoleId),
    shouldMarkTuneNotes: currentRoleId !== "all-one-instance",
  };
};
