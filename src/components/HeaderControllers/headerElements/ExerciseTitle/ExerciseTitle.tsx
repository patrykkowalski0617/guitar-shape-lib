import * as S from "./parts";
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
    <S.EditableText
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
