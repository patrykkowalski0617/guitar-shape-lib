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
  onSelectChord: (
    key: UnifiedMusicKeysDataKeys,
    chord: BaseChordDataKey,
  ) => void;
}

export function KeyAndChordPickerRow({
  group,
  isCurrentKey,
  onSelectChord,
}: Props) {
  const chordsConfig = Object.values(BASE_CHORDS);

  return (
    <S.Row $isCurrent={isCurrentKey}>
      <S.Item>
        <S.Key>{group.label}</S.Key>
      </S.Item>
      {group.chords.map((item, index) => {
        const modeName = chordsConfig[index].modeExtendedName;
        const fullLabel = `${item.chordName}${modeName}`;

        const handleChordClick = () => {
          onSelectChord(group.unifiedMusicKeyDataKey, item.baseChordDataKey);
        };

        return (
          <S.Item>
            <S.Chord key={item.combinedId} onClick={handleChordClick}>
              {fullLabel}
            </S.Chord>
          </S.Item>
        );
      })}
    </S.Row>
  );
}
