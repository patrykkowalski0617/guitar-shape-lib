import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "../Separator";
import { extendedChordNamesMap } from "./constants";
import * as S from "./parts";

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
      <S.KeySelectButton
        variant="active"
        onClick={onExpand}
        className="rounded-sm"
      >
        {activeGroup.label}
      </S.KeySelectButton>
      <Separator />
      <S.ToggleGroup
        type="single"
        value={currentValue}
        onValueChange={onSelectChord}
        className="max-w-none flex-1 rounded-sm overflow-hidden"
      >
        {activeGroup.chords.map((item: any, idx: number) => {
          return (
            <ToggleGroupItem key={item.combinedId} value={item.combinedId}>
              {`${item.chordName}${extendedChordNamesMap[idx]}`}
            </ToggleGroupItem>
          );
        })}
      </S.ToggleGroup>
    </div>
  );
}
