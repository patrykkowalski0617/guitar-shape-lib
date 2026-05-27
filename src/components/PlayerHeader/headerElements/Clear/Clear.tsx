import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { useClear } from "./useClear";

export const Clear = () => {
  const { handleClear, isListEmpty } = useClear();
  return (
    <Button $variant={"warn"} onClick={handleClear} disabled={isListEmpty}>
      <Trash2 />
    </Button>
  );
};
