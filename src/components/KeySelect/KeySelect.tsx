import { useControlsStore } from "@/store/useControlsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/utils";
import { GroupWrapper, Label } from "../customUI/InputGroup/InputGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTutorialHover } from "../TutorialBox/helpers/useTutorialHover";

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

  const tutorialHover_keySelector = useTutorialHover("key-selector");

  return (
    <div {...tutorialHover_keySelector}>
      <GroupWrapper>
        <Label>{areDescriptiveLabels ? "Roots" : "Keys"}</Label>

        <Select value={currentKeyId} onValueChange={(v) => setCurrentKey(v as MusicKeyId)}>
          <SelectTrigger className="min-w-[100px]">
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
    </div>
  );
}
