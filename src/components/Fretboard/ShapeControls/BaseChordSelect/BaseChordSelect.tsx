import { roleAndModeValuesMap } from "@/data";
import { useBaseChordSelect } from "./hooks/useBaseChordSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoleChordsNames } from "@/hooks";

const Separator = () => <div className="border-t my-1" />;

export function BaseChordSelect() {
  const { currentValue, handleValueChange, globalRoles } = useBaseChordSelect();
  const getRoleChordName = useRoleChordsNames();

  return (
    <div>
      <Select value={currentValue} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select mode & function" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-matching-key">
            {globalRoles.matchingKey.label}
          </SelectItem>

          <Separator />

          {roleAndModeValuesMap.map((item, index) => {
            const itemValue = String(index);
            const itemKey = `${item.isMajorMode ? "major" : "minor"} ${item.role}`;
            const chordName = getRoleChordName(item.semitoneOffsetFromC);

            return (
              <SelectItem key={itemKey} value={itemValue}>
                {chordName}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
