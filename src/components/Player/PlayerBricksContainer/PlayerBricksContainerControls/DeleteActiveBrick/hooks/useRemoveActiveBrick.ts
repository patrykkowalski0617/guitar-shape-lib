import { usePlayerStore } from "@/store";

export function useRemoveActiveBrick() {
  const activeBrickId = usePlayerStore((state) => state.activeBrickId);
  const removeBrick = usePlayerStore((state) => state.removeBrick);
  const bricks = usePlayerStore((state) => state.bricks);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);

  const isEditModeActive = activeBrickId !== null;

  const removeActiveBrick = () => {
    if (activeBrickId === null) return;

    const currentBrickIndex = bricks.findIndex(
      (brick) => brick.id === activeBrickId,
    );

    const isFirstBrick = currentBrickIndex === 0;
    const hasAnyBricks = bricks.length > 1;

    if (hasAnyBricks) {
      const fallbackBrickIndex = isFirstBrick ? 1 : currentBrickIndex - 1;
      const fallbackBrick = bricks[fallbackBrickIndex];

      setActiveBrickId(fallbackBrick.id);
    }

    removeBrick(activeBrickId);
  };

  return {
    isEditModeActive,
    removeActiveBrick,
  };
}
