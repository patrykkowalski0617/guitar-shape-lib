import { useState, useEffect } from "react";
import * as S from "./parts";
import { useDataKeyStore } from "@/store";

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

  const shapeDataKey = useDataKeyStore((state) => state.shapeDataKey);
  const setShapeDataKey = useDataKeyStore((state) => state.setShapeDataKey);

  const semitoneOffsetFromMajorRoot = useDataKeyStore(
    (state) => state.semitoneOffsetFromMajorRoot,
  );
  const setSemitoneOffsetFromMajorRoot = useDataKeyStore(
    (state) => state.setSemitoneOffsetFromMajorRoot,
  );

  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = useDataKeyStore.subscribe((state) => {
      const time = new Date().toLocaleTimeString();
      const k = state.unifiedMusicKeysDataKey ?? "null";
      const c = state.baseChordDataKey ?? "null";
      const s = state.shapeDataKey ?? "null";
      const o = state.semitoneOffsetFromMajorRoot ?? "null";

      const entry = `${time} | K:${k} | C:${c} | S:${s} | O:${o}`;
      setHistory((prev) => [entry, ...prev]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <S.DebugContainer>
      <S.Column>
        {/* KEY Row */}
        <S.DataRow>
          <S.Label>Key:</S.Label>
          <S.ValueBox>
            <S.ValueHighlight>
              {unifiedMusicKeysDataKey ?? "NULL"}
            </S.ValueHighlight>
          </S.ValueBox>
          <S.ButtonGroup>
            <S.ActionButton onClick={() => setUnifiedMusicKeysDataKey("Db")}>
              Set Db
            </S.ActionButton>
            <S.ResetButton onClick={() => setUnifiedMusicKeysDataKey(null)}>
              Clear
            </S.ResetButton>
          </S.ButtonGroup>
        </S.DataRow>

        {/* CHORD Row */}
        <S.DataRow>
          <S.Label>Chord:</S.Label>
          <S.ValueBox>
            <S.ValueHighlight>{baseChordDataKey ?? "NULL"}</S.ValueHighlight>
          </S.ValueBox>
          <S.ButtonGroup>
            <S.ActionButton onClick={() => setBaseChordDataKey("BaseChord2")}>
              Set BaseChord2
            </S.ActionButton>
            <S.ResetButton onClick={() => setBaseChordDataKey(null)}>
              Clear
            </S.ResetButton>
          </S.ButtonGroup>
        </S.DataRow>

        {/* SHAPE Row */}
        <S.DataRow>
          <S.Label>Shape:</S.Label>
          <S.ValueBox>
            <S.ValueHighlight>{shapeDataKey ?? "NULL"}</S.ValueHighlight>
          </S.ValueBox>
          <S.ButtonGroup>
            <S.ActionButton onClick={() => setShapeDataKey("M7")}>
              Set M7
            </S.ActionButton>
            <S.ResetButton onClick={() => setShapeDataKey(null)}>
              Clear
            </S.ResetButton>
          </S.ButtonGroup>
        </S.DataRow>

        {/* OFFSET Row */}
        <S.DataRow>
          <S.Label>Offset:</S.Label>
          <S.ValueBox>
            <S.ValueHighlight>
              {semitoneOffsetFromMajorRoot ?? "NULL"}
            </S.ValueHighlight>
          </S.ValueBox>
          <S.ButtonGroup>
            <S.ActionButton onClick={() => setSemitoneOffsetFromMajorRoot(4)}>
              Set 4
            </S.ActionButton>
            <S.ResetButton onClick={() => setSemitoneOffsetFromMajorRoot(null)}>
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
