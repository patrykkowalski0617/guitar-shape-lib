import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useControlsStore } from "@/store/useControlsStore";
import { shapes, type Shapes, UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";
import { getFilteredShapeOptions } from "./helpers/shapeHelpers";
import { ControlLabel, ControlWrapper } from "@/parts";

export function ShapeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);
  const setShape = useControlsStore((state) => state.setShape);

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
      labelShapeNama: ` ${shape.label} ${shape.type}`,
    };
  });

  const currentShapeValue =
    currentShapeId !== null && currentShapeSemitoneOffsetFromC !== null
      ? `${currentShapeId}|${currentShapeSemitoneOffsetFromC}`
      : "";

  return (
    <ControlWrapper>
      <ControlLabel>Arpeggio/Scale</ControlLabel>
      <Select
        value={currentShapeValue}
        onValueChange={(v) => {
          const [id, offsetStr] = v.split("|");
          const offset = parseInt(offsetStr, 10);
          setShape(id, offset);
        }}
      >
        <SelectTrigger className="md:min-w-[200px]">
          <SelectValue placeholder={currentRoleId ? "Select shape..." : "Select function first..."} />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          {filteredOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              <span className={"opacity-50"}>{opt.labelRootNote}</span>
              <span>{opt.labelShapeNama}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ControlWrapper>
  );
}
