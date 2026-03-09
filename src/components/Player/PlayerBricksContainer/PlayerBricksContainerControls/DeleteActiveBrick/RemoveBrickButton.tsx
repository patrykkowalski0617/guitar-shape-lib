import { Trash2 } from "lucide-react";
import { useRemoveActiveBrick } from "./hooks/useRemoveActiveBrick";
import { Button } from "@/components/ui/button";
import { playerIconSize } from "@/components/Player/constants";

export const RemoveBrickButton = () => {
  const { isEditModeActive, removeActiveBrick } = useRemoveActiveBrick();

  if (!isEditModeActive) {
    return null;
  }

  return (
    <Button variant={"playerOutlinePrimary"} onClick={removeActiveBrick}>
      <Trash2 size={playerIconSize} />
    </Button>
  );
};
