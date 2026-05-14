import * as S from "./parts";
import { useShapePlayerHeader } from "./hooks/useShapePlayerHeader";
import { Button } from "../ui/parts";

export const ShapePlayerHeader = () => {
  const {
    handleAddClick,
    clearShapePlayerBricks,
    restoreLastAction,
    isRestoreDisabled,
    isListEmpty,
  } = useShapePlayerHeader();

  return (
    <S.ShapePlayerHeaderWrapper>
      <Button onClick={handleAddClick}>Dodaj</Button>

      <Button onClick={clearShapePlayerBricks} disabled={isListEmpty}>
        Wyczyść
      </Button>

      <Button onClick={restoreLastAction} disabled={isRestoreDisabled}>
        Cofnij usunięcie
      </Button>
    </S.ShapePlayerHeaderWrapper>
  );
};
