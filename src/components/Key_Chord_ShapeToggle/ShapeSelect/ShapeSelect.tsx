import { useRef, useEffect } from "react";
import { Select, SelectItem } from "@/components/ui/custom-select";
import { useShapeSelection } from "./hooks/useShapeSelection";
import { useSortedShapeOptions } from "./hooks/useSortedShapeOptions";
import { useCurrentBaseChordName } from "@/hooks";
import { useControlsStore } from "@/store";
import * as S from "./parts";

export default function ShapeSelect() {
  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);
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
        setBaseChordId(null);
      }

      if (!hasChanged) {
        setBaseChordId(baseChordId);
      }
    }
  }, [isShapeSelectOpen, currentShapeValue, baseChordId, setBaseChordId]);

  return (
    <Select
      value={currentShapeValue ?? ""}
      onValueChange={handleValueChange}
      open={isShapeSelectOpen}
      onOpenChange={setIsShapeSelectOpen}
    >
      <S.SelectContent>
        <div className="text-center py-1 text-xs text-muted-foreground">
          Choose a shape to practice over the {selectedChordLabel} chord
        </div>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="opacity-50 mr-2">{option.labelRootNote}</span>
            <span>{option.labelShapeName}</span>
          </SelectItem>
        ))}
      </S.SelectContent>
    </Select>
  );
}
