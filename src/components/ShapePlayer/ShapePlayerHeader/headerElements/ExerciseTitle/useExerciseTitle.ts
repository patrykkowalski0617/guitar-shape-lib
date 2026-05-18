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
    (state) => state.shapePlayerBricks.length > 0,
  );

  const [isEditing, setIsEditing] = useState(false);

  const [localValue, setLocalValue] = useState<string | null>(null);

  const currentValue =
    localValue !== null ? localValue : (store_exerciseTitle ?? "");

  const enableEditing = () => {
    if (hasBricks) {
      setLocalValue(store_exerciseTitle ?? "");
      setIsEditing(true);
    }
  };

  const saveTitle = () => {
    if (localValue !== null) {
      setExerciseTitle(localValue);
    }
    setIsEditing(false);
    setLocalValue(null);
  };

  const cancelEditing = () => {
    setIsEditing(false);
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
    exerciseTitle: store_exerciseTitle ?? "",
    currentValue,
    isEditing,
    isEditable: hasBricks,
    enableEditing,
    saveTitle,
    cancelEditing,
    handleInputChange,
    handleKeyDown,
  };
};
