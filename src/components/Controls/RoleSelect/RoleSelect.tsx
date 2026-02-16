import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { roles, type RoleData, type RoleId } from "@/data";
import { TUTORIAL_CONTENT } from "../../TutorialPopover/tutorial.config";
import TutorialPopover from "../../TutorialPopover/TutorialPopover";
import { ControlLabel, ControlWrapper } from "@/parts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function RoleSelect() {
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);

  const handleValueChange = (v: string) => {
    setCurrentRoleId(v as RoleId);
  };
  const options = Object.entries(roles) as [RoleId, RoleData][];
  return (
    <ControlWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.ROLE_SELECTOR} />
      <ControlLabel>Function</ControlLabel>

      <div className="hidden sm:block">
        <ToggleGroup type="single" value={currentRoleId ?? ""} onValueChange={handleValueChange}>
          {options.map(([id, data]) => (
            <ToggleGroupItem key={id} value={id}>
              {data.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="sm:hidden">
        <Select value={currentRoleId ?? ""} onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder={"Select function"} />
          </SelectTrigger>
          <SelectContent>
            {options.map(([id, data]) => (
              <SelectItem key={id} value={id}>
                {data.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </ControlWrapper>
  );
}
