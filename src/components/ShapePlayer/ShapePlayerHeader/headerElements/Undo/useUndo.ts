import { useShapePlayerStore } from "@/store";

export const useUndo = () => {
  const restoreLastAction = useShapePlayerStore((s) => s.restoreLastAction);
  const isRestoreDisabled = useShapePlayerStore(
    (s) => s.guitarShapePlayerHistory.length === 0,
  );

  return { restoreLastAction, isRestoreDisabled };
};
