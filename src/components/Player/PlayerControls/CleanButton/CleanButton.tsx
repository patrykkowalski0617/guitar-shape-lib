import { usePlayerStore } from "@/store";
import { BrushCleaning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playerIconSize } from "../../constants";
import { useCleanBricks } from "../../hooks";

export const CleanButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const cleanBricks = useCleanBricks();

  const handleClick = cleanBricks;

  return (
    <Button
      variant={"playerOutlineWarn"}
      disabled={isPlaying}
      onClick={handleClick}
    >
      <BrushCleaning size={playerIconSize} />
    </Button>
  );
};
