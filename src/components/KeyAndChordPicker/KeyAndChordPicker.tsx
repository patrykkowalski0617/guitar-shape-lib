import * as S from "./parts";
import { KeyAndChordPickerRow } from "./KeyAndChordPickerRow/KeyAndChordPickerRow";
import { useKeyAndChordPicker } from "./hooks/useKeyAndChordPicker";

export function KeyAndChordPicker() {
  const {
    isExpanded,
    optionsPerKey,
    currentTuneKeyDataKey,
    currentCombinedValue,
    handleChordSelection,
  } = useKeyAndChordPicker();

  if (!isExpanded) return null;

  return (
    <S.Wrapper>
      {optionsPerKey.map((group) => {
        const isCurrentlyActiveKey =
          currentTuneKeyDataKey === group.unifiedMusicKeyDataKey;

        return (
          <KeyAndChordPickerRow
            key={group.unifiedMusicKeyDataKey}
            group={group}
            isCurrentKey={isCurrentlyActiveKey}
            currentValue={currentCombinedValue}
            onSelectChord={handleChordSelection}
          />
        );
      })}
    </S.Wrapper>
  );
}
