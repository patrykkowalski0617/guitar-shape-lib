import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../ControlsContainer/ControlsContainer";
import { roles, type RoleData, type RoleId } from "@/utils";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import TutorialPopover from "../TutorialPopover/TutorialPopover";

export default function RoleSelect() {
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);

  const handleValueChange = (v: string) => {
    setCurrentRoleId(v as RoleId);
  };

  return (
    <GroupWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.ROLE_SELECTOR} />
      <Label>Harmonic Function</Label>
      <ToggleGroup type="single" value={currentRoleId ?? ""} onValueChange={handleValueChange}>
        {(Object.entries(roles) as [RoleId, RoleData][]).map(([id, data]) => (
          <ToggleGroupItem key={id} value={id}>
            {data.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </GroupWrapper>
  );
}
