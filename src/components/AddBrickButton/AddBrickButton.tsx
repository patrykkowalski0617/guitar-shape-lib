import { Plus } from "lucide-react";
import { useControlsStore } from "@/store";
import { useAddBrick } from "./hooks/useAddBrick";
import * as S from "./parts";

export const AddBrickButton = () => {
  const shapeId = useControlsStore((state) => state.shapeId);
  const { addBrick } = useAddBrick();

  const isDisabled = !shapeId;

  return (
    <S.Wrapper>
      <S.AddBrickButton onClick={addBrick} $isDisabled={isDisabled}>
        <Plus size={22} />
      </S.AddBrickButton>
    </S.Wrapper>
  );
};
