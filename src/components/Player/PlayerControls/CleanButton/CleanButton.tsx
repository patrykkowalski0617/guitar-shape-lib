import { useControlsStore, usePlayerStore } from "@/store";
import { BrushCleaning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playerIconSize } from "../../constants";

export const CleanButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setBricks = usePlayerStore((state) => state.setBricks);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);
  const setRoleId = useControlsStore((state) => state.setRoleId);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);

  return (
    <Button
      variant={"playerOutlinePrimary"}
      disabled={isPlaying}
      onClick={() => {
        setBricks([]);
        setActiveBrickId(null);
        setRoleId("all-matching-key");
        setIsMajorMode(true);
      }}
    >
      <BrushCleaning size={playerIconSize} />
    </Button>
  );
};
