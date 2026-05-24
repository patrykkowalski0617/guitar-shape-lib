import { Button } from "@/components/ui/parts";
import { Trash2 } from "lucide-react";
import { useRemoveBrickButton } from "./useRemoveBrickButton";

interface RemoveBrickButtonProps {
  id: string;
}

export const RemoveBrickButton = ({ id }: RemoveBrickButtonProps) => {
  const { handleRemoveClick } = useRemoveBrickButton(id);

  return (
    <Button onClick={handleRemoveClick} $widthMultiplier={1}>
      <Trash2 />
    </Button>
  );
};
