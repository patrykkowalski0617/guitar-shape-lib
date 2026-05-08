import { Plus } from "lucide-react";
import { useControlsStore, usePlayerStore } from "@/store";
import { useAddBrick } from "./hooks/useAddBrick";
import * as S from "./parts";

export const AddBrickButton = () => {
  const shapeId = useControlsStore((state) => state.shapeId);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const { addBrick } = useAddBrick();

  const isDisabled = !shapeId || isPlaying;

  return (
    <S.Wrapper>
      <S.AddBrickButton onClick={addBrick} $isDisabled={isDisabled}>
        <Plus size={25} strokeWidth={4} />
      </S.AddBrickButton>
    </S.Wrapper>
  );
};
