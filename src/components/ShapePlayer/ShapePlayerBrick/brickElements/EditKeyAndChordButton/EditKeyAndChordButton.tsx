import { Button } from "@/components/ui";
import { useEditKeyAndChordButton } from "./useEditKeyAndChordButton";

interface EditKeyAndChordButtonProps {
  id: string;
}

export const EditKeyAndChordButton = ({ id }: EditKeyAndChordButtonProps) => {
  const { buttonText, handleEditKeyAndChord } = useEditKeyAndChordButton(id);

  return (
    <Button onClick={handleEditKeyAndChord} $w={4} $variant="ghost">
      {buttonText}
    </Button>
  );
};
