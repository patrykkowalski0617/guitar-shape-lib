import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useControlsStore } from "@/store/useControlsStore";
import shapes, { type Shapes } from "@/utils/shapes";
import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";
import { getFilteredShapeOptions } from "./helpers/shapeHelpers";
import { ControlLabel, ControlWrapper } from "@/parts";
import TutorialPopover from "@/components/TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "@/components/TutorialPopover/tutorial.config";

export function ShapeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((state) => state.currentShapeSemitoneOffsetFromC);
  const setShape = useControlsStore((state) => state.setShape);

  const isFlatTune = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatTune;

  const currentKeyNotes = useMemo(() => {
    return getNotes({ firstNote: currentKeyId }).map(({ sharpNoteName, flatNoteName }) =>
      isFlatTune ? flatNoteName : sharpNoteName,
    );
  }, [currentKeyId, isFlatTune]);

  const filteredOptions = useMemo(() => {
    const rawOptions = getFilteredShapeOptions(currentRoleId, isMajorMode);

    return rawOptions.map(({ shapeId, offset }) => {
      const shape = (shapes as Shapes)[shapeId as keyof Shapes];
      const rootNoteName = currentKeyNotes[offset % 12];

      return {
        value: `${shapeId}|${offset}`,
        labelRootNote: rootNoteName,
        labelShapeNama: ` ${shape.label} ${shape.type}`,
      };
    });
  }, [currentRoleId, isMajorMode, currentKeyNotes]);

  const currentShapeValue =
    currentShapeId !== null && currentShapeSemitoneOffsetFromC !== null
      ? `${currentShapeId}|${currentShapeSemitoneOffsetFromC}`
      : "";

  const isDisabled = !currentRoleId || filteredOptions.length === 0;

  return (
    <ControlWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.SHAPE_SELECTOR} />
      <ControlLabel>Arpeggio/Scale</ControlLabel>
      <Select
        value={currentShapeValue}
        onValueChange={(v) => {
          const [id, offsetStr] = v.split("|");
          const offset = parseInt(offsetStr, 10);
          setShape(id, offset);
        }}
        disabled={isDisabled}
      >
        <SelectTrigger disabled={isDisabled} style={{ minWidth: "194px" }}>
          <SelectValue placeholder={currentRoleId ? "Select shape..." : "Select function first..."} />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          {filteredOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              <span className={"opacity-100"}>{opt.labelRootNote}</span>
              <span className={"opacity-50"}>{opt.labelShapeNama}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ControlWrapper>
  );
}
