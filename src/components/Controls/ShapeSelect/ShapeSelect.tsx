import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useControlsStore, useMusicStore } from "@/store";
import { shapes, type Shapes, UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";
import { getFilteredShapeOptions } from "./helpers/shapeHelpers";
import { ControlLabel } from "@/parts";
import { ControlWrapper } from "../parts";

export const NONE_SHAPE_VALUE = "none";

export function ShapeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);
  const setShape = useControlsStore((state) => state.setShape);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);
  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;

  const currentKeyNotes = getNotes({ firstNote: currentKeyId }).map(({ sharpNoteName, flatNoteName }) =>
    isFlatTune ? flatNoteName : sharpNoteName,
  );

  const rawOptions = getFilteredShapeOptions(currentRoleId, isMajorMode);

  const filteredOptions = rawOptions.map(({ shapeId, offset }) => {
    const shape = shapes[shapeId as keyof Shapes];
    const rootNote = currentKeyNotes[offset % 12];

    return {
      value: `${shapeId}|${offset}`,
      labelRootNote: rootNote,
      labelShapeName: ` ${shape.label} ${shape.type}`,
    };
  });

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
    const offset = parseInt(offsetStr, 10);
    setShape(id, offset);
  };

  return (
    <ControlWrapper>
      <ControlLabel>Arp/Scale</ControlLabel>
      <Select value={currentShapeValue} onValueChange={handleValueChange}>
        <SelectTrigger className="md:min-w-[200px]">
          <SelectValue placeholder="Select shape..." />
        </SelectTrigger>

        <SelectContent className="font-semibold">
          <SelectItem value={NONE_SHAPE_VALUE}>None (Explore All Notes)</SelectItem>

          {filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="opacity-50">{option.labelRootNote}</span>
              <span>{option.labelShapeName}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ControlWrapper>
  );
}
