import { usePlayerStore, useMusicStore } from "@/store";

export function useCloseEdit() {
  const editableBrickId = usePlayerStore((state) => state.editableBrickId);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);
  const setEditableBrickId = usePlayerStore(
    (state) => state.setEditableBrickId,
  );
  const setShapeVariantDataKeys_locked = useMusicStore(
    (state) => state.setShapeVariantDataKeys_locked,
  );
  const setShapeVariantDataKeys = useMusicStore(
    (state) => state.setShapeVariantDataKeys,
  );

  const isEditModeActive = editableBrickId !== null;

  const closeEdit = () => {
    setEditableBrickId(null);
    setShapeVariantDataKeys_locked(null);
    setShapeVariantDataKeys(null);
    setActiveBrickId(null);
  };

  return {
    isEditModeActive,
    closeEdit,
  };
}
