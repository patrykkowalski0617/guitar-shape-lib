import { useShapePlayerStore } from "@/store";

export const useUndo = () => {
  const restoreLastAction = useShapePlayerStore(
    (state) => state.restoreLastAction,
  );
  const isRestoreDisabled = useShapePlayerStore(
    (state) => state.guitarShapePlayerHistory.length === 0,
  );

  return { restoreLastAction, isRestoreDisabled };
};
