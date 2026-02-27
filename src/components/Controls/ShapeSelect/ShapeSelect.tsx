import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useControlsStore, useMusicStore } from "@/store";
import { isGlobalRole } from "@/data";
import { ControlLabel } from "@/parts";
import { ControlWrapper } from "../parts";
import { useShapeOptions } from "./hooks/useShapeOptions";

export const NONE_SHAPE_VALUE = "none";

export function ShapeSelect() {
  const roleId = useControlsStore((state) => state.roleId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const shapeSemitoneOffsetFromC = useControlsStore((state) => state.shapeSemitoneOffsetFromC);

  const setShape = useControlsStore((state) => state.setShape);
  const setShapeVariantLocationData = useMusicStore((state) => state.setShapeVariantLocationData);

  const options = useShapeOptions();

  const showNoneOption = isGlobalRole(roleId);

  const currentShapeValue =
    shapeId !== null && shapeSemitoneOffsetFromC !== null ? `${shapeId}|${shapeSemitoneOffsetFromC}` : NONE_SHAPE_VALUE;

  const handleValueChange = (value: string) => {
    setShapeVariantLocationData(null);
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
        <SelectContent>
          {showNoneOption && (
            <SelectItem value={NONE_SHAPE_VALUE}>
              {roleId === "all-one-instance" ? "All notes" : "All notes matching key"}
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
