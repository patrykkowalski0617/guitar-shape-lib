import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/custom-select";
import { useShapeSelection } from "./hooks/useShapeSelection";
import { useSortedShapeOptions } from "./hooks/useSortedShapeOptions";
import { useCurrentBaseChordName } from "@/hooks";

export default function ShapeSelect() {
  const {
    currentShapeValue,
    handleValueChange,
    isShapeSelectOpen,
    setIsShapeSelectOpen,
  } = useShapeSelection();

  const options = useSortedShapeOptions();
  const selectedChordLabel = useCurrentBaseChordName();

  const isSelectDisabled = !options;
  const helperText = `Choose a shape to practice over the ${selectedChordLabel} chord`;

  return (
    <Select
      value={currentShapeValue ?? ""}
      onValueChange={handleValueChange}
      open={isShapeSelectOpen}
      onOpenChange={setIsShapeSelectOpen}
    >
      <SelectTrigger disabled={isSelectDisabled}>
        <SelectValue options={options} /> over {selectedChordLabel}
      </SelectTrigger>
      <SelectContent>
        <div className="text-center py-1 text-xs text-muted-foreground">
          {helperText}
        </div>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="opacity-50 mr-2">{option.labelRootNote}</span>
            <span>{option.labelShapeName}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
