import { useRef, useEffect } from "react";
import { Select, SelectItem } from "@/components/ui/custom-select";
import { useShapeSelection } from "./hooks/useShapeSelection";
import { useSortedShapeOptions } from "./hooks/useSortedShapeOptions";
import { useCurrentBaseChordName } from "@/hooks";
import { useControlsStore } from "@/store";
import * as S from "./parts";

export default function ShapeSelect() {
  const setBaseChordDataKey = useControlsStore(
    (state) => state.setBaseChordDataKey,
  );
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);

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
        setBaseChordDataKey(null);
      }

      if (!hasChanged) {
        setBaseChordDataKey(baseChordDataKey);
      }
    }
  }, [
    isShapeSelectOpen,
    currentShapeValue,
    baseChordDataKey,
    setBaseChordDataKey,
  ]);

  return (
    <Select
      value={currentShapeValue ?? ""}
      onValueChange={handleValueChange}
      open={isShapeSelectOpen}
      onOpenChange={setIsShapeSelectOpen}
    >
      <S.SelectContent>
        <div className="text-center py-1 text-xs text-muted-foreground">
          Choose a shape to solo over the {selectedChordLabel} chord
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
