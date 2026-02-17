import { useControlsStore } from "@/store/useControlsStore";

export const useFretboardStates = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);

  return { isShapeSelected: currentShapeId !== null, isRoleSelected: currentRoleId !== "all" };
};
