import { Button } from "../../../ui/parts";
import { useUndoButton } from "./useUndoButton";

export const UndoButton = () => {
  const { restoreLastAction, isRestoreDisabled } = useUndoButton();
  return (
    <Button onClick={restoreLastAction} disabled={isRestoreDisabled}>
      Undo clean/delete
    </Button>
  );
};
