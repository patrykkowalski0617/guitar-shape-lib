import { usePlayerStore } from "@/store";
import { OutlineButton } from "../ui/parts";
import { BrushCleaning } from "lucide-react";

export const CleanButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setBricks = usePlayerStore((state) => state.setBricks);
  const setActiveBrickId = usePlayerStore((state) => state.setActiveBrickId);

  return (
    <OutlineButton
      disabled={isPlaying}
      $isPrimary
      onClick={() => {
        setBricks([]);
        setActiveBrickId(null);
      }}
    >
      <BrushCleaning size={14} />
    </OutlineButton>
  );
};
