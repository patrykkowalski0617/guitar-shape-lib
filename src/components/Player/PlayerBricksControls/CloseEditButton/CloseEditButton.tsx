import { Check } from "lucide-react";
import { useCloseEdit } from "./hooks/useCloseEdit";
import { Button } from "@/components/ui/button";
import { playerIconSize } from "@/components/Player/constants";
import { PlayerElementWrapper } from "../../parts";

export const CloseEditButton = () => {
  const { isEditModeActive, closeEdit } = useCloseEdit();

  if (!isEditModeActive) {
    return null;
  }

  return (
    <PlayerElementWrapper>
      <Button variant={"playerSolid"} onClick={closeEdit}>
        <Check size={playerIconSize} strokeWidth={3} />
      </Button>
    </PlayerElementWrapper>
  );
};
