import { useState, useEffect } from "react";
import * as S from "./parts";
import { useDataKeyStore } from "@/store";
import { DebugRow } from "./DebugRow";
import { DebugHistory } from "./DebugHistory";

export const DataDebug = () => {
  const {
    baseChordDataKey,
    setBaseChordDataKey,
    unifiedMusicKeysDataKey,
    setUnifiedMusicKeysDataKey,
    shapeDataKey,
    setShapeDataKey,
    semitoneOffsetFromMajorRoot,
    setSemitoneOffsetFromMajorRoot,
  } = useDataKeyStore();

  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = useDataKeyStore.subscribe((state) => {
      const time = new Date().toLocaleTimeString();
      const {
        unifiedMusicKeysDataKey: k,
        baseChordDataKey: c,
        shapeDataKey: s,
        semitoneOffsetFromMajorRoot: o,
      } = state;

      const entry = `${time} | K:${k ?? "null"} | C:${c ?? "null"} | S:${s ?? "null"} | O:${o ?? "null"}`;
      setHistory((prev) => [entry, ...prev]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <S.DebugContainer>
      <S.Column>
        <DebugRow
          label="Key"
          value={unifiedMusicKeysDataKey}
          onSet={() => setUnifiedMusicKeysDataKey("Db")}
          onClear={() => setUnifiedMusicKeysDataKey(null)}
          setActionLabel="Set Db"
        />

        <DebugRow
          label="Chord"
          value={baseChordDataKey}
          onSet={() => setBaseChordDataKey("BaseChord2")}
          onClear={() => setBaseChordDataKey(null)}
          setActionLabel="Set BaseChord2"
        />

        <DebugRow
          label="Shape"
          value={shapeDataKey}
          onSet={() => setShapeDataKey("M7")}
          onClear={() => setShapeDataKey(null)}
          setActionLabel="Set M7"
        />

        <DebugRow
          label="Offset"
          value={semitoneOffsetFromMajorRoot}
          onSet={() => setSemitoneOffsetFromMajorRoot(4)}
          onClear={() => setSemitoneOffsetFromMajorRoot(null)}
          setActionLabel="Set 4"
        />
      </S.Column>

      <DebugHistory history={history} />
    </S.DebugContainer>
  );
};
