import * as S from "./parts";
import { KeyAndChordPickerRow } from "./KeyAndChordPickerRow/KeyAndChordPickerRow";
import { useKeyAndChordPicker } from "./hooks/useKeyAndChordPicker";

export function KeyAndChordPicker() {
  const {
    isExpanded,
    optionsPerKey,
    currentTuneKeyDataKey,
    currentCombinedValue,
    selectChord,
  } = useKeyAndChordPicker();

  if (!isExpanded) return null;

  return (
    <S.Wrapper>
      {optionsPerKey.map((group) => (
        <KeyAndChordPickerRow
          key={group.unifiedMusicKeyDataKey}
          group={group}
          isCurrentKey={currentTuneKeyDataKey === group.unifiedMusicKeyDataKey}
          currentValue={currentCombinedValue}
          onSelectChord={selectChord}
        />
      ))}
    </S.Wrapper>
  );
}
