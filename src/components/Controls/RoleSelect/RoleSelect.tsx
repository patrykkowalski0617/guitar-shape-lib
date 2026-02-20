import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { roles, type RoleData, type RoleId } from "@/data";
import { ControlLabel, ControlWrapper } from "@/parts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function RoleSelect() {
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);

  const handleValueChange = (v: string) => {
    setCurrentRoleId((v || "all") as RoleId);
  };

  const options = Object.entries(roles) as [RoleId, RoleData][];
  return (
    <ControlWrapper>
      <ControlLabel>
        <span className="hidden lg:block">Filter Arp/scale by Function</span>
        <span className="lg:hidden">Filter Arp/scale</span>
      </ControlLabel>

      <div className="hidden lg:block">
        <ToggleGroup type="single" value={currentRoleId ?? "all"} onValueChange={handleValueChange}>
          {options.map(([id, data]) => (
            <ToggleGroupItem key={id} value={id}>
              {data.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="lg:hidden">
        <Select value={currentRoleId ?? "all"} onValueChange={handleValueChange}>
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
