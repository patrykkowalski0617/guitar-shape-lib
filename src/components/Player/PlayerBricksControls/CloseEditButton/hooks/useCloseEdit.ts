import { usePlayerStore, useMusicStore, useControlsStore } from "@/store";

export function useCloseEdit() {
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setRoleId = useControlsStore((state) => state.setRoleId);

  const isEditModeActive = activeBrickId !== null;

  const closeEdit = () => {
    setActiveBrickId(null);
    setShapeVariantLocationData_locked(null);
    setShapeVariantLocationData(null);
    setRoleId("all-matching-key");
  };

  return {
    isEditModeActive,
    closeEdit,
  };
}
