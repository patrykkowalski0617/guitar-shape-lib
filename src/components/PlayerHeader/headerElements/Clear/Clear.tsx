// import { Trash2 } from "lucide-react";
import { Button, FadeInOut } from "@/components/ui";
import { useClear } from "./useClear";

export const Clear = () => {
  const { handleClear, isListEmpty } = useClear();

  return (
    <FadeInOut isVisible={!isListEmpty}>
      <Button $variant={"warn"} onClick={handleClear}>
        {/* <Trash2 /> */}
        Delete
        <br />
        All
      </Button>
    </FadeInOut>
  );
};
