import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useShapePlayerStore } from "@/store";

export const useExerciseTitle = () => {
  const store_exerciseTitle = useShapePlayerStore(
    (state) => state.exerciseTitle,
  );
  const setExerciseTitle = useShapePlayerStore(
    (state) => state.setExerciseTitle,
  );
  const hasBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks.length > 0,
  );

  const [localValue, setLocalValue] = useState<string | null>(null);

  const currentValue =
    localValue !== null ? localValue : (store_exerciseTitle ?? "");

  const enableEditing = () => {
    if (hasBricks) {
      setLocalValue(store_exerciseTitle ?? "");
    }
  };

  const saveTitle = () => {
    if (localValue !== null) {
      setExerciseTitle(localValue);
    }
    setLocalValue(null);
  };

  const cancelEditing = () => {
    setLocalValue(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") saveTitle();
    if (e.key === "Escape") cancelEditing();
  };

  return {
    currentValue,
    isDisabled: !hasBricks,
    enableEditing,
    saveTitle,
    cancelEditing,
    handleInputChange,
    handleKeyDown,
  };
};
