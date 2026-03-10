import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControlWrapper } from "./parts";
import { useKeySelection } from "./hooks/useKeySelection";

export function KeySelect() {
  const { tuneKeyId, isMajorMode, keyOptions, handleValueChange } =
    useKeySelection();

  return (
    <ControlWrapper>
      <Select value={tuneKeyId} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select key..." />
        </SelectTrigger>
        <SelectContent>
          {keyOptions.map((option) => {
            const majorOpacity = isMajorMode ? "opacity-100" : "opacity-50";
            const minorOpacity = !isMajorMode ? "opacity-100" : "opacity-50";

            return (
              <SelectItem key={option.value} value={option.value}>
                <span className={majorOpacity}>{option.majorName}</span>
                <span className="mx-1 opacity-50">/</span>
                <span className={minorOpacity}>{option.relativeMinorName}</span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </ControlWrapper>
  );
}
