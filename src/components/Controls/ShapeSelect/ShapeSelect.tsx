import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useControlsStore, useMusicStore } from "@/store";
import { shapes, type Shapes, UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";
import { getFilteredShapeOptions } from "./helpers/getFilteredShapeOptions";
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

  const musicKey = UNIFIED_MUSIC_KEYS[currentKeyId];
  const isFlatTune = musicKey?.isFlatTune ?? false;

  const currentKeyNotes = getNotes({ firstNote: currentKeyId }).map(({ sharpNoteName, flatNoteName }) =>
    isFlatTune ? flatNoteName : sharpNoteName,
  );

  const rawOptions = getFilteredShapeOptions(currentRoleId, isMajorMode);

  const filteredOptions = rawOptions.map(({ shapeId, offset }) => {
    const shape = shapes[shapeId as keyof Shapes];

    const noteIndex = ((offset % 12) + 12) % 12;
    const rootNote = currentKeyNotes[noteIndex];

    return {
      value: `${shapeId}|${offset}`,
      labelRootNote: rootNote,
      labelShapeName: `${shape.label} ${shape.type}`,
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
          <SelectItem value={NONE_SHAPE_VALUE}>
            {currentRoleId === "all-one-instacne" ? "All Notes" : "All Notes Matching Key"}
          </SelectItem>

          {filteredOptions.map((option) => (
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
