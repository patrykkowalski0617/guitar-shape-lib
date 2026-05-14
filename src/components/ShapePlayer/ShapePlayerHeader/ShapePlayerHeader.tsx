import * as S from "./parts";
import { useShapePlayerHeader } from "./hooks/useShapePlayerHeader";
import { Button } from "../ui/parts";

export const ShapePlayerHeader = () => {
  const {
    handleAdd,
    handleClear,
    restoreLastAction,
    isRestoreDisabled,
    isListEmpty,
  } = useShapePlayerHeader();

  return (
    <S.ShapePlayerHeaderWrapper>
      <Button onClick={handleAdd}>Dodaj</Button>

      <Button onClick={handleClear} disabled={isListEmpty}>
        Wyczyść
      </Button>

      <Button onClick={restoreLastAction} disabled={isRestoreDisabled}>
        Cofnij usunięcie
      </Button>
    </S.ShapePlayerHeaderWrapper>
  );
};
