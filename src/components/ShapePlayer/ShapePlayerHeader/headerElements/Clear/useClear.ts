import { useDataKeyStore, useShapePlayerStore } from "@/store";

export const useClear = () => {
  const clearShapePlayerBricks = useShapePlayerStore(
    (state) => state.clearShapePlayerBricks,
  );
  const isListEmpty = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks.length === 0,
  );
  const resetDataKeys = useDataKeyStore((state) => state.resetDataKeys);

  const handleClear = () => {
    clearShapePlayerBricks();
    resetDataKeys();
  };

  return { handleClear, isListEmpty };
};
