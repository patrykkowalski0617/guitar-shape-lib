import { useControlsStore } from "@/store/useControlsStore";
import { type RoleId } from "@/data";
import { ControlLabel, ControlWrapper } from "@/parts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ModeAndRoleSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);
  const currentValue =
    currentRoleId === "all" || !currentRoleId ? "all" : `${isMajorMode ? "major" : "minor"}-${currentRoleId}`;
  const roles = [
    { id: "tonic", label: "Tonic" },
    { id: "subdominant", label: "Subdominant" },
    { id: "dominant", label: "Dominant" },
  ];

  const handleValueChange = (value: string) => {
    if (value === "all") {
      setCurrentRoleId("all");
      return;
    }

    const [mode, role] = value.split("-") as ["major" | "minor", RoleId];
    setIsMajorMode(mode === "major");
    setCurrentRoleId(role);
  };

  return (
    <ControlWrapper>
      <ControlLabel>Filter Arp/Scale</ControlLabel>

      <Select value={currentValue} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select mode & function" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <div className="border-t my-1"></div>
          {roles.map((f) => (
            <SelectItem key={`major-${f.id}`} value={`major-${f.id}`}>
              Major {f.label}
            </SelectItem>
          ))}

          <div className="border-t my-1"></div>
          {roles.map((f) => (
            <SelectItem key={`minor-${f.id}`} value={`minor-${f.id}`}>
              Minor {f.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ControlWrapper>
  );
}
