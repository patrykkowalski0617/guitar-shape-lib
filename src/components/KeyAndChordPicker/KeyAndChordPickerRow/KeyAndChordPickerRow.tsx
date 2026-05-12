import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  BASE_CHORDS,
  type BaseChordDataKey,
  type NoteName,
  type UnifiedMusicKeysDataKeys,
} from "@/data";
import * as S from "./parts";

interface ChordOption {
  baseChordDataKey: BaseChordDataKey;
  combinedId: string;
  chordName: NoteName;
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
  onSelectChord: (
    key: UnifiedMusicKeysDataKeys,
    chord: BaseChordDataKey,
  ) => void;
}

export function KeyAndChordPickerRow({
  group,
  isCurrentKey,
  currentValue,
  onSelectChord,
}: Props) {
  const chordsConfig = Object.values(BASE_CHORDS);

  return (
    <S.RowWrapper $isCurrent={isCurrentKey}>
      <S.KeyLabel>{group.label}</S.KeyLabel>

      <ToggleGroup type="single" value={currentValue} className="flex-1">
        {group.chords.map((item, index) => {
          const modeName = chordsConfig[index].modeExtendedName;
          const fullLabel = `${item.chordName}${modeName}`;

          return (
            <ToggleGroupItem
              key={item.combinedId}
              value={item.combinedId}
              onClick={() =>
                onSelectChord(
                  group.unifiedMusicKeyDataKey,
                  item.baseChordDataKey,
                )
              }
            >
              {fullLabel}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </S.RowWrapper>
  );
}
