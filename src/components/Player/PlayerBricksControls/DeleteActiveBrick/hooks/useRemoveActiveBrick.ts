import { useApplySnapshotToStore } from "@/components/Player/PlayerBrick/hooks";
import { usePlayerStore } from "@/store";

export function useRemoveActiveBrick() {
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const removeBrick = usePlayerStore((state) => state.removeBrick);
  const bricks = usePlayerStore((state) => state.bricks);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);

  const applySnapshotToStore = useApplySnapshotToStore();

  const isEditModeActive = activeBrickId !== null;

  const removeActiveBrick = () => {
    if (activeBrickId === null) return;

    const idToRemove = activeBrickId;
    const currentBrickIndex = bricks.findIndex((b) => b.id === idToRemove);

    removeBrick(idToRemove);

    if (bricks.length > 1) {
      const remainingBricks = bricks.filter((b) => b.id !== idToRemove);
      const isFirst = currentBrickIndex === 0;
      const fallbackIndex = isFirst ? 0 : currentBrickIndex - 1;
      const fallbackBrick = remainingBricks[fallbackIndex];

      if (fallbackBrick && fallbackBrick.snapshot) {
        const { snapshot } = fallbackBrick;

        applySnapshotToStore(snapshot);

        setActiveBrickId(fallbackBrick.id);
      }
    }
  };

  return {
    isEditModeActive,
    removeActiveBrick,
  };
}
