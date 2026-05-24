import { Button } from "@/components/ui/parts";
import { useEditShapeButton } from "./useEditShapeButton";

interface EditShapeButtonProps {
  id: string;
}

export const EditShapeButton = ({ id }: EditShapeButtonProps) => {
  const { guitarShapeName, handleEditShape } = useEditShapeButton(id);

  return (
    <Button $widthMultiplier={4} onClick={handleEditShape}>
      {guitarShapeName}
    </Button>
  );
};
