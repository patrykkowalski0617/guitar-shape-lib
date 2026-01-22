import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../ControlsContainer/ControlsContainer";
import { roles, type RoleData, type RoleId } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import TutorialPopover from "../TutorialPopover/TutorialPopover";

export default function RoleSelect() {
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);

  const handleValueChange = (v: string) => {
    setCurrentRoleId(v as RoleId);
  };

  return (
    <GroupWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.ROLE_SELECTOR} />
      <Label>{areDescriptiveLabels ? "Energy" : "Function"} </Label>
      <ToggleGroup type="single" value={currentRoleId ?? ""} onValueChange={handleValueChange}>
        {(Object.entries(roles) as [RoleId, RoleData][]).map(([id, data]) => (
          <ToggleGroupItem title={data.descriptiveLabel} key={id} value={id}>
            {areDescriptiveLabels ? data.descriptiveLabel : data.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </GroupWrapper>
  );
}
