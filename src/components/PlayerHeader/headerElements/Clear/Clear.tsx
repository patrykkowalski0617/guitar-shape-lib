// import { Trash2 } from "lucide-react";
import { Button, FadeInOut } from "@/components/ui";
import { useClear } from "./useClear";

export const Clear = () => {
  const { handleClear, isListEmpty } = useClear();

  return (
    <FadeInOut isVisible={!isListEmpty} isPersistent>
      <Button
        $variant={"warn"}
        onClick={handleClear}
        disabled={isListEmpty}
        style={{ width: 50 }}
      >
        {/* <Trash2 /> */}
        Clear
        <br />
        All
      </Button>
    </FadeInOut>
  );
};
