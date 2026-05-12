import { useState } from "react";
import * as S from "./parts";
import { useDataKeyStore } from "@/store";
import type { UnifiedMusicKeysDataKeys } from "@/data/UNIFIED_MUSIC_KEYS";
import type { BaseChordDataKey } from "@/data/BASE_CHORDS";

export const DataDebug = () => {
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const setUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.setUnifiedMusicKeysDataKey,
  );

  const [history, setHistory] = useState<string[]>([]);

  const updateHistory = (newKey: string | null, newChord: string | null) => {
    const time = new Date().toLocaleTimeString();
    const keyLabel = newKey ?? "null";
    const chordLabel = newChord ?? "null";
    const entry = `${time} | Key: ${keyLabel} | Chord: ${chordLabel}`;

    setHistory((prev) => [entry, ...prev]);
  };

  const handleKeyUpdate = (value: UnifiedMusicKeysDataKeys | null) => {
    setUnifiedMusicKeysDataKey(value);
    updateHistory(value, baseChordDataKey);
  };

  const handleChordUpdate = (value: BaseChordDataKey | null) => {
    setBaseChordDataKey(value);
    updateHistory(unifiedMusicKeysDataKey, value);
  };

  return (
    <S.DebugContainer>
      <S.Column>
        <S.DataRow>
          <S.Label>Key:</S.Label>
          <S.ValueBox>
            <S.ValueHighlight>
              {unifiedMusicKeysDataKey ?? "NULL"}
            </S.ValueHighlight>
          </S.ValueBox>
          <S.ButtonGroup>
            <S.ActionButton onClick={() => handleKeyUpdate("Db")}>
              Set Db
            </S.ActionButton>
            <S.ResetButton onClick={() => handleKeyUpdate(null)}>
              Clear
            </S.ResetButton>
          </S.ButtonGroup>
        </S.DataRow>

        <S.DataRow>
          <S.Label>Chord:</S.Label>
          <S.ValueBox>
            <S.ValueHighlight>{baseChordDataKey ?? "NULL"}</S.ValueHighlight>
          </S.ValueBox>
          <S.ButtonGroup>
            <S.ActionButton onClick={() => handleChordUpdate("BaseChord2")}>
              Set BaseChord2
            </S.ActionButton>
            <S.ResetButton onClick={() => handleChordUpdate(null)}>
              Clear
            </S.ResetButton>
          </S.ButtonGroup>
        </S.DataRow>
      </S.Column>

      <S.Column>
        <S.HistoryHeader>Full History</S.HistoryHeader>
        <S.HistoryScrollArea>
          {history.map((entry, index) => (
            <S.HistoryEntry key={index}>{entry}</S.HistoryEntry>
          ))}
        </S.HistoryScrollArea>
      </S.Column>
    </S.DebugContainer>
  );
};
