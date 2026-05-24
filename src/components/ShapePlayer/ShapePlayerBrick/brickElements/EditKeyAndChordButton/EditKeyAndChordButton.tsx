import { Button } from "@/components/ui/parts";
import { useEditKeyAndChordButton } from "./useEditKeyAndChordButton";

interface EditKeyAndChordButtonProps {
  id: string;
  displayMode: "key" | "chord";
}

export const EditKeyAndChordButton = ({
  id,
  displayMode,
}: EditKeyAndChordButtonProps) => {
  const { buttonText, handleEditKeyAndChord } = useEditKeyAndChordButton(
    id,
    displayMode,
  );

  return <Button onClick={handleEditKeyAndChord}>{buttonText}</Button>;
};
