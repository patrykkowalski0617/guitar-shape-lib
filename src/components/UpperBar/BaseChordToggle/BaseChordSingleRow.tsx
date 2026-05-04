import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Separator } from "../Separator";
import { BASE_CHORDS } from "@/data";

interface Props {
  group: any;
  isCurrentKey: boolean;
  currentValue: string | undefined;
  isLastRow: boolean;
  onSelectKey: () => void;
  onSelectChord: (val: string) => void;
  onClose: () => void;
}

export function BaseChordSingleRow({
  group,
  isCurrentKey,
  currentValue,
  isLastRow,
  onSelectKey,
  onSelectChord,
  onClose,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-row w-full items-center transition-opacity duration-200",
        !isCurrentKey && "opacity-70 hover:opacity-100",
      )}
    >
      <Button
        variant={isCurrentKey ? "active" : "default"}
        onClick={isCurrentKey ? onClose : onSelectKey}
        className={cn(
          "h-8 !rounded-none min-w-[70px] border-l border-b border-background/20",
          isLastRow && "border-b-0",
        )}
      >
        {group.label}
      </Button>
      <Separator />
      <ToggleGroup
        type="single"
        value={currentValue}
        onValueChange={onSelectChord}
        className="max-w-none flex-1"
      >
        {group.chords.map((item: any, idx: number) => (
          <ToggleGroupItem
            key={item.combinedId}
            value={item.combinedId}
            className={cn(
              "!rounded-none border-b border-background/20",
              isLastRow && "border-b-0",
            )}
          >
            {`${item.chordName}${Object.values(BASE_CHORDS)[idx].modeExtendedName}`}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
