import { Button } from "../../../ui/parts";
import { useAddButton } from "./useAddButton";

export const AddButton = () => {
  const { handleAdd } = useAddButton();
  return <Button onClick={handleAdd}>Add</Button>;
};
