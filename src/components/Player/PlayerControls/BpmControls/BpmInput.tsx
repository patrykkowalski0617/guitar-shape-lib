import { useBpmLogic } from "./hooks/useBpmLogic";
import * as S from "./parts";

export const BpmInput = () => {
  const {
    inputValue,
    setInputValue,
    isDraggingState,
    inputRef,
    handleCommit,
    handleKeyDown,
    onStart,
    handleFocus,
  } = useBpmLogic();

  return (
    <S.BpmInput
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleCommit}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseDown={onStart}
      onTouchStart={onStart}
      style={{
        cursor: "ns-resize",
        userSelect: isDraggingState ? "none" : "auto",
        touchAction: "none",
      }}
    />
  );
};
