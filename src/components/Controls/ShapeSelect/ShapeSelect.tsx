import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControlLabel } from "@/parts";
import { ControlWrapper } from "../parts";
import { useShapeSelection } from "./hooks/useShapeSelection";

export function ShapeSelect() {
  const { currentShapeValue, handleValueChange, options, noneOption } =
    useShapeSelection();

  return (
    <ControlWrapper>
      <ControlLabel>Shapes</ControlLabel>
      <Select value={currentShapeValue} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select shape..." />
        </SelectTrigger>
        <SelectContent>
          {noneOption.shouldShow && (
            <SelectItem value={noneOption.value}>{noneOption.label}</SelectItem>
          )}

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="opacity-50 mr-2">{option.labelRootNote}</span>
              <span>{option.labelShapeName}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ControlWrapper>
  );
}
