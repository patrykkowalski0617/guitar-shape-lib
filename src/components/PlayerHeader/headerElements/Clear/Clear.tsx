// import { Trash2 } from "lucide-react";
import { Button, FadeInOut } from "@/components/ui";
import { useClear } from "./useClear";

export const Clear = () => {
  const { handleClear, isListEmpty } = useClear();

  return (
    <FadeInOut isVisible={!isListEmpty} isPersistent>
      <Button $variant={"warn"} onClick={handleClear} disabled={isListEmpty}>
        {/* <Trash2 /> */}
        Delete
        <br />
        All
      </Button>
    </FadeInOut>
  );
};
