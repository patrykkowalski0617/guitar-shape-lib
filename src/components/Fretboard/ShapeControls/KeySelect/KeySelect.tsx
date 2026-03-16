import { SelectItem } from "@/components/ui/select";
import { ControlWrapper } from "./parts";
import { useKeySelection } from "./hooks/useKeySelection";
import { SelectPrevNext } from "@/components/ui/select-prev-next";

export function KeySelect() {
  const { tuneKeyId, isMajorMode, keyOptions, handleValueChange } =
    useKeySelection();

  return (
    <ControlWrapper>
      <SelectPrevNext
        value={tuneKeyId}
        onValueChange={handleValueChange}
        options={keyOptions}
      >
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
      </SelectPrevNext>
    </ControlWrapper>
  );
}
