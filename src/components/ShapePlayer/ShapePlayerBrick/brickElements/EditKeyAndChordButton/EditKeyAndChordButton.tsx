import { Button } from "@/components/ui/parts";
import { useEditKeyAndChordButton } from "./useEditKeyAndChordButton";

interface EditKeyAndChordButtonProps {
  id: string;
}

export const EditKeyAndChordButton = ({ id }: EditKeyAndChordButtonProps) => {
  const { buttonText, handleEditKeyAndChord } = useEditKeyAndChordButton(id);

  return (
    <Button onClick={handleEditKeyAndChord} $widthMultiplier={4}>
      {buttonText}
    </Button>
  );
};
