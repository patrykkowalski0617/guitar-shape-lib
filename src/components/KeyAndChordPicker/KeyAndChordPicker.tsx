import * as S from "./parts";
import { KeyAndChordPickerRow } from "./KeyAndChordPickerRow/KeyAndChordPickerRow";
import { useKeyAndChordPicker } from "./hooks/useKeyAndChordPicker";

export function KeyAndChordPicker() {
  const {
    isKeyAndChordPickerExpanded,
    optionsPerKey,
    unifiedMusicKeysDataKey,
    handleChordSelection,
  } = useKeyAndChordPicker();

  if (!isKeyAndChordPickerExpanded) return null;

  return (
    <S.Wrapper>
      {optionsPerKey.map((group) => {
        const isCurrentlyActiveKey =
          unifiedMusicKeysDataKey === group.unifiedMusicKeyDataKey;

        return (
          <KeyAndChordPickerRow
            key={group.unifiedMusicKeyDataKey}
            group={group}
            isCurrentKey={isCurrentlyActiveKey}
            onSelectChord={handleChordSelection}
          />
        );
      })}
    </S.Wrapper>
  );
}
