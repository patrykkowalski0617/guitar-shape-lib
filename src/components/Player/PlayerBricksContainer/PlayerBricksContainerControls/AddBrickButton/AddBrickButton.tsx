import { Plus } from "lucide-react";
import { usePlayerStore } from "@/store";
import { useAddBrick } from "./hooks/useAddBrick";
import { Button } from "@/components/ui/button";

export const AddBrickButton = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const { addBrick } = useAddBrick();

  if (isPlaying) {
    return null;
  }

  return (
    <Button variant={"playerDashed"} onClick={addBrick}>
      <Plus size={16} />
    </Button>
  );
};
