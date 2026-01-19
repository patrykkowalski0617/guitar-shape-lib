import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useControlsStore } from "@/store/useControlsStore";
import { GroupWrapper, Label } from "../customUI/InputGroup/InputGroup";
import { useSettingsStore } from "@/store/useSettingsStore";
import shapes, { type Shapes } from "@/utils/shapes";
import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";
import { getFilteredShapeOptions } from "./helpers/shapeHelpers";
import { useTutorialHover } from "../TutorialBox/helpers/useTutorialHover";

export default function ShapeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const currentShapeOffset = useControlsStore((state) => state.currentShapeOffset);
  const setShape = useControlsStore((state) => state.setShape);
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);

  const isFlatKey = UNIFIED_MUSIC_KEYS[currentKeyId].isFlatKey;

  const currentKeyNotes = useMemo(() => {
    return getNotes({ firstNote: currentKeyId }).map(({ sharpNoteName, flatNoteName }) =>
      isFlatKey ? flatNoteName : sharpNoteName
    );
  }, [currentKeyId, isFlatKey]);

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
    currentShapeId !== null && currentShapeOffset !== null
      ? `${currentShapeId}|${currentShapeOffset}`
      : "";

  const isDisabled = !currentRoleId || filteredOptions.length === 0;

  const tutorialHover_shapeList = useTutorialHover("shape-list");

  return (
    <div {...tutorialHover_shapeList}>
      <GroupWrapper>
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
          <SelectTrigger disabled={isDisabled} className="min-w-[211px]">
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
    </div>
  );
}
