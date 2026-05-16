import { useDataKeyStore, useShapePlayerStore } from "@/store";

export const useClearButton = () => {
  const clearShapePlayerBricks = useShapePlayerStore(
    (state) => state.clearShapePlayerBricks,
  );
  const isListEmpty = useShapePlayerStore(
    (state) => state.shapePlayerBricks.length === 0,
  );
  const resetDataKeys = useDataKeyStore((state) => state.resetDataKeys);

  const handleClear = () => {
    clearShapePlayerBricks();
    resetDataKeys();
  };

  return { handleClear, isListEmpty };
};
