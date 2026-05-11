import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BASE_CHORDS, type UnifiedMusicKeysDataKeys } from "@/data";
import * as S from "./parts";

interface ChordOption {
  id: string;
  combinedId: string;
  chordName: string;
}

interface KeyGroup {
  unifiedMusicKeyDataKey: UnifiedMusicKeysDataKeys;
  label: string;
  chords: ChordOption[];
}

interface Props {
  group: KeyGroup;
  isCurrentKey: boolean;
  currentValue: string | undefined;
  onSelectChord: (val: string) => void;
}

export function KeyAndChordPickerRow({
  group,
  isCurrentKey,
  currentValue,
  onSelectChord,
}: Props) {
  const chordsData = Object.values(BASE_CHORDS);

  return (
    <S.RowWrapper $isCurrent={isCurrentKey}>
      <S.KeyLabel>{group.label}</S.KeyLabel>

      <ToggleGroup
        type="single"
        value={currentValue}
        onValueChange={onSelectChord}
        className="flex-1"
      >
        {group.chords.map((item, index) => {
          const modeName = chordsData[index].modeExtendedName;
          const fullLabel = `${item.chordName}${modeName}`;

          return (
            <ToggleGroupItem key={item.combinedId} value={item.combinedId}>
              {fullLabel}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </S.RowWrapper>
  );
}
