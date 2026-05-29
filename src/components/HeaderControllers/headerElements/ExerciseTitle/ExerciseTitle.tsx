import * as S from "./parts";
import { useExerciseTitle } from "./useExerciseTitle";

export const ExerciseTitle = () => {
  const {
    displayValue,
    isDisabled,
    inputRef,
    enableEditing,
    saveTitle,
    handleKeyDown,
    handleInputChange,
    handleFocus,
  } = useExerciseTitle();

  return (
    <S.Wrapper>
      <S.HiddenText>{displayValue || " "}</S.HiddenText>

      <S.EditableText
        ref={inputRef}
        value={displayValue}
        onChange={handleInputChange}
        onBlur={saveTitle}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          enableEditing();
          handleFocus();
        }}
        disabled={isDisabled}
      />
    </S.Wrapper>
  );
};
