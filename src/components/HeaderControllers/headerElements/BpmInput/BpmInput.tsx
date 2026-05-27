import { useBpmLogic } from "./hooks/useBpmLogic";
import * as S from "./parts";

export const BpmInput = () => {
  const {
    inputValue,
    setInputValue,
    isDraggingState,
    isFocused,
    inputRef,
    handleCommit,
    handleKeyDown,
    onStart,
    handleFocus,
  } = useBpmLogic();

  const rawValue = inputValue;
  const formattedValue = `${inputValue} bpm`;
  const displayValue = isFocused ? rawValue : formattedValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <S.NumberInput
      ref={inputRef}
      type="text"
      value={displayValue}
      onChange={handleInputChange}
      onBlur={handleCommit}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseDown={onStart}
      onTouchStart={onStart}
      $isDraggingState={isDraggingState}
    />
  );
};
