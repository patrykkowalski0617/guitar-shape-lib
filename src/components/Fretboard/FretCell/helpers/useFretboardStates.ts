import { useControlsStore } from "@/store";

export const useFretboardStates = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);

  return {
    isShapeSelected: currentShapeId !== null,
    isRoleSelected: currentRoleId !== "all-one-instacne" && currentRoleId !== "all-maching-key",
    shouldMarkTuneNotes: currentRoleId !== "all-one-instacne",
  };
};
