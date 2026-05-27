import * as S from "./parts";
import { KeyAndChordPickerRow } from "./KeyAndChordPickerRow/KeyAndChordPickerRow";
import { useKeyAndChordPicker } from "./hooks/useKeyAndChordPicker";
import { Item, Row } from "./KeyAndChordPickerRow/parts";
import { roleNumNameMajor, roleNumNameMinor } from "./constants";
import { useMusicStore } from "@/store";

export function KeyAndChordPicker() {
  const {
    isKeyAndChordPickerExpanded,
    optionsPerKey,
    unifiedMusicKeysDataKey,
    handleChordSelection,
  } = useKeyAndChordPicker();

  const isMajorMode = useMusicStore((s) => s.isMajorMode);
  const setIsMajorMode = useMusicStore((s) => s.setIsMajorMode);
  const roleNumName = isMajorMode ? roleNumNameMajor : roleNumNameMinor;

  // if (!isKeyAndChordPickerExpanded) return null;

  return (
    <S.Wrapper>
      <Row>
        <Item
          onClick={() => {
            setIsMajorMode(!isMajorMode);
          }}
        >
          {isMajorMode ? "Major" : "minor"}
          {":"}
        </Item>
        {roleNumName.map((roleName, i) => (
          <Item key={i}>{roleName}</Item>
        ))}
      </Row>
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
