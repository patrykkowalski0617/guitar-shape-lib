import { useShapePlayerStore } from "@/store";

export const useUndoButton = () => {
  const restoreLastAction = useShapePlayerStore(
    (state) => state.restoreLastAction,
  );
  const isRestoreDisabled = useShapePlayerStore(
    (state) => state.shapePlayerHistory.length === 0,
  );

  return { restoreLastAction, isRestoreDisabled };
};
