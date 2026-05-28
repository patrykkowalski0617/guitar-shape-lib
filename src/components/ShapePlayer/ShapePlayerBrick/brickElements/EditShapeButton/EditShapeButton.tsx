import { Button } from "@/components/ui";
import { useEditShapeButton } from "./useEditShapeButton";

interface EditShapeButtonProps {
  id: string;
}

export const EditShapeButton = ({ id }: EditShapeButtonProps) => {
  const { guitarShapeName, handleEditShape } = useEditShapeButton(id);

  return (
    <Button $variant="ghost" $w={3} onClick={handleEditShape}>
      Solo:
      <br /> {guitarShapeName}
    </Button>
  );
};
