import { Plus } from "lucide-react";
import { useControlsStore } from "@/store";
import { useAddBrick } from "./hooks/useAddBrick";
import * as S from "./parts";
import { usePersistentUnlock } from "@/hooks";

export const AddBrickButton = () => {
  const shapeId = useControlsStore((state) => state.shapeId);
  const { addBrick } = useAddBrick();

  const isDisabled = !shapeId;

  const isTemporarlyDisabled = usePersistentUnlock(isDisabled);

  return (
    <S.Wrapper
      onClick={addBrick}
      $isDisabled={isDisabled}
      $isTemporarlyDisabled={isTemporarlyDisabled}
    >
      <Plus size={22} color="var(--secondary)" />
    </S.Wrapper>
  );
};
