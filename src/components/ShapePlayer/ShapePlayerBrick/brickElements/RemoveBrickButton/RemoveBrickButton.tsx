// import { Trash2 } from "lucide-react";
import { useRemoveBrickButton } from "./useRemoveBrickButton";
import { Button } from "@/components/ui";

interface RemoveBrickButtonProps {
  id: string;
}

export const RemoveBrickButton = ({ id }: RemoveBrickButtonProps) => {
  const { handleRemoveClick } = useRemoveBrickButton(id);

  return (
    <Button onClick={handleRemoveClick} $variant={"warn"} $w={1.3}>
      {/* <Trash2 /> */}
      Delete
    </Button>
  );
};
