import { Button } from "../../../ui/parts";
import { useClearButton } from "./useClearButton";

export const ClearButton = () => {
  const { handleClear, isListEmpty } = useClearButton();
  return (
    <Button onClick={handleClear} disabled={isListEmpty}>
      Clean
    </Button>
  );
};
