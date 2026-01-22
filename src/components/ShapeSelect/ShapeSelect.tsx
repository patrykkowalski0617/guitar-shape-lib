import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useControlsStore } from "@/store/useControlsStore";
import { GroupWrapper, Label } from "../ControlsContainer/ControlsContainer";
import { useSettingsStore } from "@/store/useSettingsStore";
import shapes, { type Shapes } from "@/utils/shapes";
import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";
import { getFilteredShapeOptions } from "./helpers/shapeHelpers";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import TutorialPopover from "../TutorialPopover/TutorialPopover";

export default function ShapeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.currentShapeSemitoneOffsetFromC,
  );
  const setShape = useControlsStore((state) => state.setShape);
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);

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
        label: `${rootNoteName} ${shape.label} ${shape.type}`,
      };
    });
  }, [currentRoleId, isMajorMode, currentKeyNotes]);

  const currentShapeValue =
    currentShapeId !== null && currentShapeSemitoneOffsetFromC !== null
      ? `${currentShapeId}|${currentShapeSemitoneOffsetFromC}`
      : "";

  const isDisabled = !currentRoleId || filteredOptions.length === 0;

  return (
    <GroupWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.SHAPE_SELECTOR} />
      <Label>{areDescriptiveLabels ? "Set of notes" : "Shapes"}</Label>
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
          <SelectValue
            placeholder={
              currentRoleId
                ? "Select shape..."
                : areDescriptiveLabels
                  ? "Select energy first..."
                  : "Select function first..."
            }
          />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          {filteredOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              <span className={isMajorMode ? "opacity-100" : "opacity-90"}>{opt.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </GroupWrapper>
  );
}
