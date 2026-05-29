import { Button } from "@/components/ui";
import { useUndo } from "./useUndo";

export const Undo = () => {
  const { restoreLastAction, isRestoreDisabled } = useUndo();
  return (
    <Button onClick={restoreLastAction} disabled={isRestoreDisabled}>
      Undo clean/delete
    </Button>
  );
};
