// import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { useClear } from "./useClear";

export const Clear = () => {
  const { handleClear, isListEmpty } = useClear();
  // if (!isListEmpty) return null;
  return (
    // <FadeInOut isVisible={!isListEmpty}>
    <Button
      $variant={"warn"}
      onClick={handleClear}
      $w={1.3}
      disabled={isListEmpty}
    >
      {/* <Trash2 /> */}
      Clear
    </Button>
    // </FadeInOut>
  );
};
