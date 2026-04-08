import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const disabled = !options;
  const selectedChordLabel = useCurrentBaseChordName();

  return (
    <Select
      disabled={disabled}
      value={currentShapeValue ?? ""}
      onValueChange={handleValueChange}
      open={isShapeSelectOpen}
      onOpenChange={setIsShapeSelectOpen}
    >
      <SelectTrigger>
        <SelectValue /> over {selectedChordLabel}
      </SelectTrigger>
      <SelectContent>
        <div className="text-center py-1 text-xs text-muted-foreground">
          Choose a shape to practice over the {selectedChordLabel} chord
        </div>
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
