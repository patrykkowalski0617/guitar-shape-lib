import { Button } from "../../../ui/parts";
import { useExerciseTitle } from "./useExerciseTitle";

export const ExerciseTitle = () => {
  const {
    exerciseTitle,
    isEditing,
    currentValue,
    isEditable,
    enableEditing,
    saveTitle,
    handleKeyDown,
    handleInputChange,
  } = useExerciseTitle();

  if (!isEditable) {
    return null;
  }

  if (isEditing) {
    return (
      <input
        autoFocus
        className="border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
        value={currentValue}
        onChange={handleInputChange}
        onBlur={saveTitle}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return <Button onClick={enableEditing}>{exerciseTitle}</Button>;
};
