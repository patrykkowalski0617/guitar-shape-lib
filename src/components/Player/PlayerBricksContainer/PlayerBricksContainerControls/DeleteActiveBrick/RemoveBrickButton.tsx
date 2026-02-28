import { Trash2 } from "lucide-react";
import { useRemoveActiveBrick } from "./hooks/useRemoveActiveBrick";
import { OutlineButton } from "@/components/Player/ui/parts";

export const RemoveBrickButton = () => {
  const { isEditModeActive, removeActiveBrick } = useRemoveActiveBrick();

  if (!isEditModeActive) {
    return null;
  }

  return (
    <OutlineButton $isPrimary onClick={removeActiveBrick}>
      <Trash2 size={14} />
    </OutlineButton>
  );
};
