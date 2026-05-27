import { useShapePlayerStore } from "@/store";

export const useCounter = (id: string, currentPlayLength: number) => {
  const updateBrick = useShapePlayerStore((s) => s.updateBrick);

  const minLength = 1;
  const maxLength = 8;

  const handleIncrement = () => {
    const nextLength = Math.min(currentPlayLength + 1, maxLength);
    updateBrick(id, { playLength: nextLength });
  };

  const handleDecrement = () => {
    const nextLength = Math.max(currentPlayLength - 1, minLength);
    updateBrick(id, { playLength: nextLength });
  };

  const isDecrementDisabled = currentPlayLength <= minLength;
  const isIncrementDisabled = currentPlayLength >= maxLength;

  return {
    handleIncrement,
    handleDecrement,
    isDecrementDisabled,
    isIncrementDisabled,
  };
};
