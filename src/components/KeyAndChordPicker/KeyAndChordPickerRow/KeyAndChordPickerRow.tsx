import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BASE_CHORDS } from "@/data";

interface Props {
  group: any;
  isCurrentKey: boolean;
  currentValue: string | undefined;
  onSelectKey: () => void;
  onSelectChord: (val: string) => void;
}

export function KeyAndChordPickerRow({
  group,
  isCurrentKey,
  currentValue,
  onSelectKey,
  onSelectChord,
}: Props) {
  const keyButtonVariant = isCurrentKey ? "active" : "default";

  return (
    <div className="flex flex-row w-full items-center">
      <Button variant={keyButtonVariant} onClick={onSelectKey}>
        {group.label}
      </Button>

      <ToggleGroup
        type="single"
        value={currentValue}
        onValueChange={onSelectChord}
        className="flex-1"
      >
        {group.chords.map((item: any, index: number) => {
          const modeName = Object.values(BASE_CHORDS)[index].modeExtendedName;
          const fullLabel = `${item.chordName}${modeName}`;

          return (
            <ToggleGroupItem key={item.combinedId} value={item.combinedId}>
              {fullLabel}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
