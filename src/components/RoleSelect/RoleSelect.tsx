import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../customUI/InputGroup/InputGroup";
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
        onValueChange={handleValueChange}
        className="h-8 justify-start border rounded-md p-0 bg-muted/30 border-muted-foreground/20 w-fit gap-0 overflow-hidden"
      >
        {(Object.entries(roles) as [RoleId, RoleData][]).map(([id, data]) => (
          <ToggleGroupItem
            title={data.descriptiveLabel}
            key={id}
            value={id}
            className="h-full px-3 text-[12px] uppercase font-semibold tracking-tight data-[state=on]:bg-background data-[state=on]:text-foreground rounded-none border-r last:border-r-0 border-muted-foreground/10 transition-none"
          >
            {areDescriptiveLabels ? data.descriptiveLabel : data.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </GroupWrapper>
  );
}
