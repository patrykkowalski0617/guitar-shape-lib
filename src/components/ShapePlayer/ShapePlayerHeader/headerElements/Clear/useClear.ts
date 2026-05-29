import { useDataKeyStore, useShapePlayerStore } from "@/store";

export const useClear = () => {
  const clearShapePlayerBricks = useShapePlayerStore(
    (s) => s.clearShapePlayerBricks,
  );
  const isListEmpty = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks.length === 0,
  );
  const resetDataKeys = useDataKeyStore((s) => s.resetDataKeys);

  const handleClear = () => {
    clearShapePlayerBricks();
    resetDataKeys();
  };

  return { handleClear, isListEmpty };
};
