import { usePlayerStore, useMusicStore } from "@/store";

export function useCloseEdit() {
  const editableBrickId = usePlayerStore((state) => state.editableBrickId);
  const setEditableBrickId = usePlayerStore(
    (state) => state.setEditableBrickId,
  );
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );

  const isEditModeActive = editableBrickId !== null;

  const closeEdit = () => {
    setEditableBrickId(null);
    setShapeVariantLocationData_locked(null);
    setShapeVariantLocationData(null);
  };

  return {
    isEditModeActive,
    closeEdit,
  };
}
