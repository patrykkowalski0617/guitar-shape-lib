import { usePlayerStore } from "@/store";

export function useRemoveActiveBrick() {
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const removeBrick = usePlayerStore((state) => state.removeBrick);

  const isEditModeActive = activeBrickId !== null;

  const removeActiveBrick = () => {
    const hasActiveBrick = activeBrickId !== null;

    if (hasActiveBrick) {
      removeBrick(activeBrickId);
    }
  };

  return {
    isEditModeActive,
    removeActiveBrick,
  };
}
