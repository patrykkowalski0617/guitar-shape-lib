import { usePlayerStore } from "@/store";
import { BrushCleaning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playerIconSize } from "../../constants";

export const CleanButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setBricks = usePlayerStore((state) => state.setBricks);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);

  return (
    <Button
      variant={"playerOutlinePrimary"}
      disabled={isPlaying}
      onClick={() => {
        setBricks([]);
        setActiveBrickId(null);
      }}
    >
      <BrushCleaning size={playerIconSize} />
    </Button>
  );
};
