import { useControlsStore } from "@/store/useControlsStore";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/utils";
import { GroupWrapper, Label } from "../ControlsContainer/ControlsContainer";
import { SelectItem } from "@/components/ui/select";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { SelectWithNext } from "../ui/select-with-next";

export default function KeySelect() {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setCurrentKey = useControlsStore((state) => state.setCurrentKey);

  const keyOptions = Object.entries(UNIFIED_MUSIC_KEYS).map(([id, data]) => ({
    value: id,
    label: isMajorMode ? data.majorName : data.relativeMinorName,

    ...data,
  }));

  return (
    <GroupWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.KEY_SELECTOR} />
      <Label>Key</Label>

      <SelectWithNext
        value={currentKeyId}
        onValueChange={(v) => setCurrentKey(v as MusicKeyId)}
        options={keyOptions}
        triggerClassName="min-w-[100px]"
      >
        {keyOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="!min-w-[100px]">
            <span className={isMajorMode ? "opacity-100" : "opacity-50"}>{opt.majorName}</span>
            <span className="mx-1 opacity-50">/</span>
            <span className={!isMajorMode ? "opacity-100" : "opacity-50"}>
              {opt.relativeMinorName}
            </span>
          </SelectItem>
        ))}
      </SelectWithNext>
    </GroupWrapper>
  );
}
