import { usePlayerStore } from "@/store";
import { BrushCleaning } from "lucide-react";
import * as S from "./parts";
import { playerIconSize } from "../../constants";
import { useCleanBricks } from "../../hooks";
import { usePersistentUnlock } from "@/hooks";

export const CleanButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);
  const cleanBricks = useCleanBricks();

  const handleClick = cleanBricks;
  const isDisabled = !bricks.length;
  const isTemporarlyDisabled = usePersistentUnlock(isDisabled);

  return (
    <S.Button
      variant={"playerOutlineWarn"}
      $isDisabled={isPlaying || isDisabled}
      $isTemporarlyDisabled={isTemporarlyDisabled}
      onClick={handleClick}
    >
      <BrushCleaning size={playerIconSize} />
    </S.Button>
  );
};
