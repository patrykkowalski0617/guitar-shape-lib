import { useControlsStore } from "@/store/useControlsStore";

export const useFretboardStates = () => {
  const currentRoleId = useControlsStore((state) => state.currentRoleId);

  return { isRoleSelected: !!currentRoleId };
};
