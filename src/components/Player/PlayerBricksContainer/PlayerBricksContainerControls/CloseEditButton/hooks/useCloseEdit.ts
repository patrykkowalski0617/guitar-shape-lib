import { usePlayerStore, useMusicStore } from "@/store";

export function useCloseEdit() {
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);
  const setShapeVariantLocationData_ghost = useMusicStore((state) => state.setShapeVariantLocationData_ghost);

  const isEditModeActive = activeBrickId !== null;

  const closeEdit = () => {
    setActiveBrickId(null);
    setShapeVariantLocationData_ghost(null);
  };

  return {
    isEditModeActive,
    closeEdit,
  };
}
