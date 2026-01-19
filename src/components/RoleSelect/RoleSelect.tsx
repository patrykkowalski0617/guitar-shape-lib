import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../customUI/InputGroup/InputGroup";
import { roles, type RoleData, type RoleId } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useTutorialHover } from "../TutorialBox/helpers/useTutorialHover";

export default function RoleSelect() {
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);

  const handleValueChange = (v: string) => {
    setCurrentRoleId(v as RoleId);
  };
  const tutorialHover_functionSelector = useTutorialHover("function-selector");

  return (
    <div {...tutorialHover_functionSelector}>
      <GroupWrapper>
        <Label>{areDescriptiveLabels ? "Energy" : "Function"} </Label>
        <ToggleGroup
          className="min-w-[258px]"
          type="single"
          value={currentRoleId ?? ""}
          onValueChange={handleValueChange}
        >
          {(Object.entries(roles) as [RoleId, RoleData][]).map(([id, data]) => (
            <ToggleGroupItem title={data.descriptiveLabel} key={id} value={id}>
              {areDescriptiveLabels ? data.descriptiveLabel : data.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </GroupWrapper>
    </div>
  );
}
