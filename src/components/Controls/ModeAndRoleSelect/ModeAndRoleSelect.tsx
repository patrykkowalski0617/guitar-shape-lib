import { useMusicStore, useControlsStore } from "@/store";
import { type RoleId, roles } from "@/data";
import { ControlWrapper } from "../parts";
import { ControlLabel } from "@/parts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const isGlobalRole = (roleId: RoleId | null): roleId is "all-one-instacne" | "all-maching-key" =>
  roleId === "all-one-instacne" || roleId === "all-maching-key";

export function ModeAndRoleSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const setCurrentRoleId = useControlsStore((state) => state.setCurrentRoleId);
  const setShape = useControlsStore((state) => state.setShape);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const effectiveRoleId = currentRoleId ?? "all-one-instacne";

  const currentValue = isGlobalRole(effectiveRoleId)
    ? effectiveRoleId
    : `${isMajorMode ? "major" : "minor"}-${effectiveRoleId}`;

  const handleValueChange = (value: string) => {
    setCurrentShapeVariantLocationData(null);

    if (value in roles && isGlobalRole(value as RoleId)) {
      setCurrentRoleId(value as RoleId);
      setShape(null, null);
      return;
    }

    const [mode, role] = value.split("-") as ["major" | "minor", RoleId];
    setIsMajorMode(mode === "major");
    setCurrentRoleId(role);
  };

  const functionalRoles = (Object.entries(roles) as [RoleId, { label: string }][]).filter(([id]) => !isGlobalRole(id));

  return (
    <ControlWrapper>
      <ControlLabel>Filter Arp/Scale</ControlLabel>

      <Select value={currentValue} onValueChange={handleValueChange}>
        <SelectTrigger className="md:min-w-[200px]">
          <SelectValue placeholder="Select mode & function" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-one-instacne">{roles["all-one-instacne"].label}</SelectItem>
          <SelectItem value="all-maching-key">{roles["all-maching-key"].label}</SelectItem>

          <div className="border-t my-1" />
          {functionalRoles.map(([id, data]) => (
            <SelectItem key={`major-${id}`} value={`major-${id}`}>
              Major {data.label}
            </SelectItem>
          ))}

          <div className="border-t my-1" />
          {functionalRoles.map(([id, data]) => (
            <SelectItem key={`minor-${id}`} value={`minor-${id}`}>
              Minor {data.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ControlWrapper>
  );
}
