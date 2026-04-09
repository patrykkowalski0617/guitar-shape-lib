import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Separator } from "../Separator";

interface Props {
  activeGroup: any;
  currentValue: string | undefined;
  onExpand: () => void;
  onSelectChord: (val: string) => void;
}

export function BaseChordCollapsedView({
  activeGroup,
  currentValue,
  onExpand,
  onSelectChord,
}: Props) {
  return (
    <div className="absolute inset-0 flex flex-row w-full items-center z-10">
      <Button
        variant="active"
        onClick={onExpand}
        className="rounded-r-none rounded-l-sm min-w-[70px]"
      >
        {activeGroup.label}
      </Button>
      <Separator />
      <ToggleGroup
        type="single"
        value={currentValue}
        onValueChange={onSelectChord}
        className="max-w-none flex-1"
      >
        {activeGroup.chords.map((item: any, idx: number) => {
          const isLastInRow = idx === activeGroup.chords.length - 1;
          return (
            <ToggleGroupItem
              key={item.combinedId}
              value={item.combinedId}
              className={cn(
                "!rounded-none border-y border-background/20",
                isLastInRow && "border-r !rounded-r-sm",
              )}
            >
              {item.chordName}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
