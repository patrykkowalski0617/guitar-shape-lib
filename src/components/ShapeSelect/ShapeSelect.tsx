import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useControlsStore } from "@/store/useControlsStore";
import { GroupWrapper, Label } from "../InputGroup/InputGroup";
import { useSettingsStore } from "@/store/useSettingsStore";
import shapes from "@/utils/shapes";
import { getNotes, UNIFIED_MUSIC_KEYS } from "@/utils";

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
    if (!currentRoleId) return [];

    const options: { value: string; label: string }[] = [];

    Object.entries(shapes).forEach(([shapeId, shape]) => {
      const roleData =
        shape.semitoneOffsetFromMajorTonicRoot[
          currentRoleId as keyof typeof shape.semitoneOffsetFromMajorTonicRoot
        ];

      if (!roleData) return;

      const offsets: number[] = [
        ...(roleData.bothModes || []),
        ...(isMajorMode ? roleData.majorMode || [] : roleData.minorMode || []),
      ];

      offsets.forEach((offsetIndex) => {
        const rootNoteName = currentKeyNotes[offsetIndex % 12];

        options.push({
          value: `${shapeId}|${offsetIndex}`,
          label: `${rootNoteName} ${shape.label} ${shape.type}`,
        });
      });
    });

    return options;
  }, [currentRoleId, isMajorMode, currentKeyNotes]);

  const currentShapeValue =
    currentShapeId !== null && currentShapeOffset !== null
      ? `${currentShapeId}|${currentShapeOffset}`
      : "";

  const isDisabled = !currentRoleId || filteredOptions.length === 0;

  return (
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
        <SelectTrigger
          disabled={isDisabled}
          style={{ height: "40px", minWidth: "210px" }}
          className={`font-semibold bg-muted/30 border-muted-foreground/20 focus:ring-0 focus:ring-offset-0 ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
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
