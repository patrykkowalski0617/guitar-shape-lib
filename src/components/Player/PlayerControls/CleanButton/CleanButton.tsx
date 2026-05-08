import { usePlayerStore } from "@/store";
import { BrushCleaning } from "lucide-react";
import * as S from "./parts";
import { playerIconSize } from "../../constants";
import { useCleanBricks } from "../../hooks";

export const CleanButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);
  const cleanBricks = useCleanBricks();

  const handleClick = cleanBricks;
  const isDisabled = !bricks.length;

  return (
    <S.Button
      variant={"playerOutlineWarn"}
      $isDisabled={isPlaying || isDisabled}
      onClick={handleClick}
    >
      <BrushCleaning size={playerIconSize} />
    </S.Button>
  );
};
