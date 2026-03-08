import { usePlayerStore, useMusicStore } from "@/store";

export function useCloseEdit() {
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );

  const isEditModeActive = activeBrickId !== null;

  const closeEdit = () => {
    setActiveBrickId(null);
    setShapeVariantLocationData_locked(null);
  };

  return {
    isEditModeActive,
    closeEdit,
  };
}
