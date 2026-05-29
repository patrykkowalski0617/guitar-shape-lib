import { Button } from "@/components/ui";
import { useAdd } from "./useAdd";
// import { Plus } from "lucide-react";

export const Add = () => {
  const { handleAdd } = useAdd();
  return (
    <Button $w={2} $variant={"secondary"} onClick={handleAdd}>
      {/* <Plus /> */}
      Add Shape
    </Button>
  );
};
