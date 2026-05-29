import { Button } from "@/components/ui";
import { useEdit } from "./useEdit";

export const Edit = ({ $w }: { $w: number }) => {
  const { handleEdit, isEditShapeView } = useEdit();
  return (
    <Button $variant={"outline"} $w={$w} onClick={handleEdit}>
      {isEditShapeView ? "Close Edit" : "Edit"}
    </Button>
  );
};
