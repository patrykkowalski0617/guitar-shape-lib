import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { roles, type RoleData, type RoleId } from "@/utils";
import { TUTORIAL_CONTENT } from "../../TutorialPopover/tutorial.config";
import TutorialPopover from "../../TutorialPopover/TutorialPopover";
import { ControlLabel, ControlWrapper } from "@/parts";

export function RoleSelect() {
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);

  const handleValueChange = (v: string) => {
    setCurrentRoleId(v as RoleId);
  };

  return (
    <ControlWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.ROLE_SELECTOR} />
      <ControlLabel>Function</ControlLabel>
      <ToggleGroup type="single" value={currentRoleId ?? ""} onValueChange={handleValueChange}>
        {(Object.entries(roles) as [RoleId, RoleData][]).map(([id, data]) => (
          <ToggleGroupItem key={id} value={id}>
            {data.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </ControlWrapper>
  );
}
