import { useShapePlayerStore } from "@/store";
import * as S from "./parts";

export const ShapePlayerHeader = () => {
  const addShapePlayerBrick = useShapePlayerStore(
    (state) => state.addShapePlayerBrick,
  );

  return (
    <S.ShapePlayerActionButton onClick={addShapePlayerBrick}>
      Dodaj sekcję
    </S.ShapePlayerActionButton>
  );
};
