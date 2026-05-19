import { Button } from "../../../ui/parts";
import { useClear } from "./useClear";

export const Clear = () => {
  const { handleClear, isListEmpty } = useClear();
  return (
    <Button onClick={handleClear} disabled={isListEmpty}>
      Clean
    </Button>
  );
};
