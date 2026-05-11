import { useShapePlayerStore } from "@/store";

export const useShapePlayerHeader = () => {
  const addShapePlayerBrick = useShapePlayerStore(
    (state) => state.addShapePlayerBrick,
  );
  const clearShapePlayerBricks = useShapePlayerStore(
    (state) => state.clearShapePlayerBricks,
  );
  const restoreLastAction = useShapePlayerStore(
    (state) => state.restoreLastAction,
  );

  const isRestoreDisabled = useShapePlayerStore(
    (state) => state.shapePlayerHistory.length === 0,
  );

  const isListEmpty = useShapePlayerStore(
    (state) => state.shapePlayerBricks.length === 0,
  );

  return {
    addShapePlayerBrick,
    clearShapePlayerBricks,
    restoreLastAction,
    isRestoreDisabled,
    isListEmpty,
  };
};
