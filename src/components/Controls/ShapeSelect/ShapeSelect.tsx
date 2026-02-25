import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useControlsStore, useMusicStore } from "@/store";
import { isGlobalRole } from "@/data";
import { ControlLabel } from "@/parts";
import { ControlWrapper } from "../parts";
import { useShapeOptions } from "./hooks/useShapeOptions";

export const NONE_SHAPE_VALUE = "none";

export function ShapeSelect() {
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);

  const setShape = useControlsStore((state) => state.setShape);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const options = useShapeOptions();

  const showNoneOption = isGlobalRole(currentRoleId);

  const currentShapeValue =
    currentShapeId !== null && currentShapeSemitoneOffsetFromC !== null
      ? `${currentShapeId}|${currentShapeSemitoneOffsetFromC}`
      : NONE_SHAPE_VALUE;

  const handleValueChange = (value: string) => {
    setCurrentShapeVariantLocationData(null);
    if (value === NONE_SHAPE_VALUE) {
      setShape(null, null);
      return;
    }
    const [id, offsetStr] = value.split("|");
    setShape(id, parseInt(offsetStr, 10));
  };

  return (
    <ControlWrapper>
      <ControlLabel>Arp/Scale</ControlLabel>
      <Select value={currentShapeValue} onValueChange={handleValueChange}>
        <SelectTrigger className="md:min-w-[200px]">
          <SelectValue placeholder="Select shape..." />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          {showNoneOption && (
            <SelectItem value={NONE_SHAPE_VALUE}>
              {currentRoleId === "all-one-instance" ? "All notes" : "All notes matching key"}
            </SelectItem>
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
