import { ControlWrapper } from "../parts";
import { ControlLabel } from "@/parts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModeAndRole } from "./hooks/useModeAndRole";

const Separator = () => <div className="border-t my-1" />;

export function ModeAndRoleSelect() {
  const { currentValue, handleValueChange, functionalRoles, globalRoles } =
    useModeAndRole();

  return (
    <ControlWrapper>
      <ControlLabel>Filter Shapes By Function</ControlLabel>

      <Select value={currentValue} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select mode & function" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-one-instance">
            {globalRoles.oneInstance.label}
          </SelectItem>
          <SelectItem value="all-matching-key">
            {globalRoles.matchingKey.label}
          </SelectItem>

          <Separator />

          {functionalRoles.map(([id, data]) => (
            <SelectItem key={`major-${id}`} value={`major-${id}`}>
              Major {data.label}
            </SelectItem>
          ))}

          <Separator />

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
