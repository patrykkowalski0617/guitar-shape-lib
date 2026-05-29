import { useState, useRef, type ChangeEvent, type KeyboardEvent } from "react";
import { useShapePlayerStore } from "@/store";

export const useExerciseTitle = () => {
  const store_exerciseTitle = useShapePlayerStore((s) => s.exerciseTitle);
  const setExerciseTitle = useShapePlayerStore((s) => s.setExerciseTitle);
  const hasBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks.length > 0,
  );

  const [localValue, setLocalValue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue =
    localValue !== null ? localValue : (store_exerciseTitle ?? "");
  const displayValue = currentValue || (!hasBricks ? "Exercise title" : "");

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

  const handleFocus = () => {
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };

  return {
    displayValue,
    isDisabled: !hasBricks,
    inputRef,
    enableEditing,
    saveTitle,
    cancelEditing,
    handleInputChange,
    handleKeyDown,
    handleFocus,
  };
};
