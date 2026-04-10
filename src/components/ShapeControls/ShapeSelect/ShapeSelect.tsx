import { useRef, useEffect } from "react";
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
import { useControlsStore } from "@/store";

export default function ShapeSelect() {
  const setToggleBaseChordId = useControlsStore(
    (state) => state.setToggleBaseChordId,
  );
  const baseChordId = useControlsStore((state) => state.baseChordId);

  const {
    currentShapeValue,
    handleValueChange,
    isShapeSelectOpen,
    setIsShapeSelectOpen,
  } = useShapeSelection();

  const options = useSortedShapeOptions();
  const selectedChordLabel = useCurrentBaseChordName();

  const valueOnOpenRef = useRef<string | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isShapeSelectOpen) {
      valueOnOpenRef.current = currentShapeValue ?? null;
    } else {
      const hasChanged = valueOnOpenRef.current !== currentShapeValue;
      if (!currentShapeValue) {
        setToggleBaseChordId(null);
      }

      if (!hasChanged) {
        setToggleBaseChordId(baseChordId);
      }
    }
  }, [isShapeSelectOpen, currentShapeValue, baseChordId, setToggleBaseChordId]);

  const isSelectDisabled = !options;

  return (
    <Select
      value={currentShapeValue ?? ""}
      onValueChange={handleValueChange}
      open={isShapeSelectOpen}
      onOpenChange={setIsShapeSelectOpen}
    >
      <SelectTrigger disabled={isSelectDisabled}>
        <SelectValue options={options} />{" "}
        <span className="opacity-50">over {selectedChordLabel}</span>
      </SelectTrigger>
      <SelectContent>
        <div className="text-center py-1 text-xs text-muted-foreground">
          Choose a shape to practice over the {selectedChordLabel} chord
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
