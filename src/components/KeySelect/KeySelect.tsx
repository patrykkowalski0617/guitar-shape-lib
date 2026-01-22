import { useControlsStore } from "@/store/useControlsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/utils";
import { GroupWrapper, Label } from "../ControlsContainer/ControlsContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";

export default function KeySelect() {
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
      <TutorialPopover {...TUTORIAL_CONTENT.KEY_SELECTOR} />
      <Label>{areDescriptiveLabels ? "Roots" : "Keys"}</Label>

      <Select value={currentKeyId} onValueChange={(v) => setCurrentKey(v as MusicKeyId)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
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
