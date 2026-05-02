import { Trash2 } from "lucide-react";
import { useRemoveActiveBrick } from "./hooks/useRemoveActiveBrick";
import { playerIconSize } from "@/components/Player/constants";
import * as S from "./parts";

export const RemoveBrickButton = () => {
  const { isEditModeActive, removeActiveBrick } = useRemoveActiveBrick();

  if (!isEditModeActive) {
    return null;
  }

  return (
    <S.Button variant={"playerOutlineWarn"} onClick={removeActiveBrick}>
      <Trash2 size={playerIconSize} />
    </S.Button>
  );
};
