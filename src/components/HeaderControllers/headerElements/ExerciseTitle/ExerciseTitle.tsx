import { EditableText } from "@/components/ui";
import { useExerciseTitle } from "./useExerciseTitle";

export const ExerciseTitle = () => {
  const {
    currentValue,
    isDisabled,
    inputRef,
    enableEditing,
    saveTitle,
    handleKeyDown,
    handleInputChange,
    handleFocus,
  } = useExerciseTitle();

  return (
    <EditableText
      ref={inputRef}
      value={currentValue}
      onChange={handleInputChange}
      onBlur={saveTitle}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        enableEditing();
        handleFocus();
      }}
      disabled={isDisabled}
    />
  );
};
