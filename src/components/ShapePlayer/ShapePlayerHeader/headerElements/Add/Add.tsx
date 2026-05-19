import { Button } from "../../../ui/parts";
import { useAdd } from "./useAdd";

export const Add = () => {
  const { handleAdd } = useAdd();
  return <Button onClick={handleAdd}>Add</Button>;
};
