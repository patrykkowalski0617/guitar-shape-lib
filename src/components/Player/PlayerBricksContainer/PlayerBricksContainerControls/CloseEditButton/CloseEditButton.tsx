import { Check } from "lucide-react";
import { useCloseEdit } from "./hooks/useCloseEdit";
import { SolidButton } from "@/components/Player/ui/parts";

export const CloseEditButton = () => {
  const { isEditModeActive, closeEdit } = useCloseEdit();

  if (!isEditModeActive) {
    return null;
  }

  return (
    <SolidButton onClick={closeEdit}>
      <Check size={16} />
    </SolidButton>
  );
};
