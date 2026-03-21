import { useBaseChordOptions } from "./hooks/useBaseChordOptions";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useBaseChordToggle } from "./hooks/useBaseChordToggle";

export default function BaseChordToggle() {
  const { currentValue, handleValueChange } = useBaseChordToggle();
  const baseChordOptions = useBaseChordOptions();

  const activeValue = (currentValue as string) ?? "";

  return (
    <ToggleGroup
      type="single"
      value={activeValue}
      onValueChange={(value) => {
        const newValue = value !== "" ? value : null;
        handleValueChange(newValue);
      }}
    >
      {baseChordOptions.map((item) => {
        return (
          <ToggleGroupItem
            key={item.key}
            value={item.value}
            aria-label={item.chordName}
          >
            {item.chordName}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}
