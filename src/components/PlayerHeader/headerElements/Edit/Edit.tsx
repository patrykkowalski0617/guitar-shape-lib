import { Button } from "@/components/ui";
import { useEdit } from "./useEdit";

export const Edit = () => {
  const { handleEdit, isEditShapeView } = useEdit();
  return (
    <Button $variant={"outline"} onClick={handleEdit}>
      {isEditShapeView ? "Close Edit" : "Edit"}
    </Button>
  );
};
