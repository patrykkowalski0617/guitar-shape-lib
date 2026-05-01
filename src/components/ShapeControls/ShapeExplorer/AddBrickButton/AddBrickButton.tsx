import { Plus } from "lucide-react";
import { useControlsStore, usePlayerStore } from "@/store";
import { useAddBrick } from "./hooks/useAddBrick";
import * as S from "./parts";

export const AddBrickButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const shapeId = useControlsStore((state) => state.shapeId);
  const { addBrick } = useAddBrick();

  if (isPlaying || !shapeId) {
    return null;
  }

  return (
    <S.Wrapper onClick={addBrick}>
      <Plus size={22} color="var(--secondary)" />
    </S.Wrapper>
  );
};
