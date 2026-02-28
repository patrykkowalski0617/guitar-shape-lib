import { Plus } from "lucide-react";
import { usePlayerStore } from "@/store";
import { useAddBrick } from "./hooks/useAddBrick";
import { DashedButton } from "@/components/Player/ui/parts";

export const AddBrickButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const { addBrick } = useAddBrick();

  if (isPlaying) {
    return null;
  }

  return (
    <DashedButton onClick={addBrick}>
      <Plus size={16} />
    </DashedButton>
  );
};
