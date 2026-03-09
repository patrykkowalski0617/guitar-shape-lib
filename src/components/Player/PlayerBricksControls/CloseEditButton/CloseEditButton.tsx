import { Check } from "lucide-react";
import { useCloseEdit } from "./hooks/useCloseEdit";
import { Button } from "@/components/ui/button";
import { playerIconSize } from "@/components/Player/constants";

export const CloseEditButton = () => {
  const { isEditModeActive, closeEdit } = useCloseEdit();

  if (!isEditModeActive) {
    return null;
  }

  return (
    <Button variant={"playerSolid"} onClick={closeEdit}>
      <Check size={playerIconSize} strokeWidth={3} />
    </Button>
  );
};
