import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShapeSelection } from "./hooks/useShapeSelection";
import { useSortedShapeOptions } from "./hooks/useSortedShapeOptions";

export default function ShapeSelect() {
  const {
    currentShapeValue,
    handleValueChange,
    isShapeSelectOpen,
    setIsShapeSelectOpen,
  } = useShapeSelection();

  const options = useSortedShapeOptions();
  const disabled = !options;

  return (
    <Select
      disabled={disabled}
      value={currentShapeValue ?? ""}
      onValueChange={handleValueChange}
      open={isShapeSelectOpen}
      onOpenChange={setIsShapeSelectOpen}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options &&
          options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="opacity-50 mr-2">{option.labelRootNote}</span>
              <span>{option.labelShapeName}</span>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
