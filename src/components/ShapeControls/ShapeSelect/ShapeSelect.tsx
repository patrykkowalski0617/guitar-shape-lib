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
  const { currentShapeValue, handleValueChange } = useShapeSelection();
  const options = useSortedShapeOptions();
  if (!options) return null;

  return (
    <Select value={currentShapeValue} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select shape..." />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="opacity-50 mr-2">{option.labelRootNote}</span>
            <span>{option.labelShapeName}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
