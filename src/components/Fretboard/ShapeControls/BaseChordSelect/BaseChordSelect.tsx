import { useBaseChordSelect } from "./hooks/useBaseChordSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBaseChordOptions } from "./hooks/useBaseChordOptions";

export function BaseChordSelect() {
  const { currentValue, handleValueChange, globalRoles } = useBaseChordSelect();
  const baseChordOptions = useBaseChordOptions();

  return (
    <Select value={currentValue as string} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select mode & function" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all-matching-key">
          {globalRoles.matchingKey.label}
        </SelectItem>

        {baseChordOptions.map((item) => {
          return (
            <SelectItem key={item.key} value={item.value}>
              {item.chordName}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
