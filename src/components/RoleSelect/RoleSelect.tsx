import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../InputGroup/InputGroup";
import { roles, type RoleData, type RoleId } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function RoleSelect() {
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);

  const handleValueChange = (v: string) => {
    setCurrentRoleId(v as RoleId);
  };

  return (
    <GroupWrapper>
      <Label>{areDescriptiveLabels ? "Energy" : "Function"} </Label>
      <ToggleGroup
        type="single"
        value={currentRoleId ?? ""}
        onValueChange={(v) => {
          handleValueChange(v);
        }}
        className="h-10 justify-start border rounded-md p-1 bg-muted/50 border-muted-foreground/20 w-fit"
      >
        {(Object.entries(roles) as [RoleId, RoleData][]).map(([id, data]) => (
          <ToggleGroupItem
            title={data.descriptiveLabel}
            key={id}
            value={id}
            className="h-full px-4 text-xs uppercase font-semibold data-[state=on]:bg-background data-[state=on]:shadow-sm"
          >
            {areDescriptiveLabels ? data.descriptiveLabel : data.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </GroupWrapper>
  );
}
