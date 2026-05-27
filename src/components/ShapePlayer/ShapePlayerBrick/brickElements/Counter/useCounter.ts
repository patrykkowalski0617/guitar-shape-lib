import { useShapePlayerStore } from "@/store";

export const useCounter = (id: string, currentPlayLength: number) => {
  const updateBrick = useShapePlayerStore((s) => s.updateBrick);

  const minLength = 1;
  const maxLength = 8;

  const handleIncrement = () => {
    const nextLength = Math.min(currentPlayLength + 1, maxLength);
    const updatePayload = { playLength: nextLength };

    updateBrick(id, updatePayload);
  };

  const handleDecrement = () => {
    const nextLength = Math.max(currentPlayLength - 1, minLength);
    const updatePayload = { playLength: nextLength };

    updateBrick(id, updatePayload);
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
