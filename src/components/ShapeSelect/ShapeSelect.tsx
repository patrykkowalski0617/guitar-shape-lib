import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useControlsStore } from "@/store/useControlsStore";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/utils";
import { GroupWrapper, Label } from "../InputGroup/InputGroup";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function ShapeSelect() {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setCurrentKey = useControlsStore((state) => state.setCurrentKey);
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);

  const options = Object.entries(UNIFIED_MUSIC_KEYS).map(([id, data]) => ({
    id: id as MusicKeyId,
    majorName: data.majorName,
    relativeMinorName: data.relativeMinorName,
  }));

  return (
    <GroupWrapper>
      <Label>{areDescriptiveLabels ? "Set of notes" : "Shapes"}</Label>
      <Select value={currentKeyId} onValueChange={(v) => setCurrentKey(v as MusicKeyId)}>
        <SelectTrigger
          style={{ height: "40px" }}
          className="bg-muted/30 border-muted-foreground/20 focus:ring-0 focus:ring-offset-0 font-semibold"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          {options.map((opt) => (
            <SelectItem key={opt.id} value={opt.id}>
              <span className={isMajorMode ? "opacity-100" : "opacity-50"}>{opt.majorName}</span>
              <span className="mx-1 opacity-50">/</span>
              <span className={!isMajorMode ? "opacity-100" : "opacity-50"}>
                {opt.relativeMinorName}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </GroupWrapper>
  );
}
