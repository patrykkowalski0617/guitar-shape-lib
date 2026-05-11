import * as S from "./parts";
import { useShapePlayerHeader } from "./hooks/useShapePlayerHeader";

export const ShapePlayerHeader = () => {
  const {
    addShapePlayerBrick,
    clearShapePlayerBricks,
    restoreLastAction,
    isRestoreDisabled,
    isListEmpty,
  } = useShapePlayerHeader();

  return (
    <S.ShapePlayerHeaderWrapper>
      <S.ShapePlayerActionButton onClick={addShapePlayerBrick}>
        Dodaj
      </S.ShapePlayerActionButton>

      <S.ShapePlayerActionButton
        onClick={clearShapePlayerBricks}
        disabled={isListEmpty}
      >
        Wyczyść
      </S.ShapePlayerActionButton>

      <S.ShapePlayerActionButton
        onClick={restoreLastAction}
        disabled={isRestoreDisabled}
      >
        Cofnij usunięcie
      </S.ShapePlayerActionButton>
    </S.ShapePlayerHeaderWrapper>
  );
};
