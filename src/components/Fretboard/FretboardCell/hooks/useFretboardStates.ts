import { useControlsStore } from "@/store";
import { isGlobalRole } from "@/data";

export const useFretboardStates = () => {
  const shapeId = useControlsStore((state) => state.shapeId);
  const roleId = useControlsStore((state) => state.roleId);

  return {
    isShapeSelected: shapeId !== null,
    isRoleSelected: !isGlobalRole(roleId),
    shouldMarkTuneNotes: roleId !== "all-one-instance",
  };
};
