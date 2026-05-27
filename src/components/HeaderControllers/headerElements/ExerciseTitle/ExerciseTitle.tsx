import { EditableText } from "@/components/ui";
import { useExerciseTitle } from "./useExerciseTitle";

export const ExerciseTitle = () => {
  const {
    currentValue,
    isDisabled,
    enableEditing,
    saveTitle,
    handleKeyDown,
    handleInputChange,
  } = useExerciseTitle();

  return (
    <EditableText
      value={currentValue}
      onChange={handleInputChange}
      onBlur={saveTitle}
      onKeyDown={handleKeyDown}
      onFocus={enableEditing}
      disabled={isDisabled}
    />
  );
};
